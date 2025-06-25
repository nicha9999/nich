import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User, UserPagination } from 'app/core/user/user.types';
import { BehaviorSubject, map, Observable, of, ReplaySubject, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _httpClient = inject(HttpClient);
    private _user: ReplaySubject<User> = new ReplaySubject(null);
    private _users: ReplaySubject<User[]> = new ReplaySubject<User[]>(null);
    private _pagination: BehaviorSubject<UserPagination | null> = new BehaviorSubject(null);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

   /**
    * Setter for user
    *
    * @param value
    */
   set user(value: User)
   {
       // Store the value
       this._user.next(value);
   }

   /**
    * Getter for user
    */
   get user$(): Observable<User>
   {
       return this._user.asObservable();
   }
   
   /**
    * Getter for users
    */
   get users$(): Observable<User[]>
   {
       return this._users.asObservable();
   }

   /**
    * Getter for pagination
    */
   get pagination$(): Observable<UserPagination>
   {
       return this._pagination.asObservable();
   }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getUser(page: number = 0, size: number = 10, sort: string = 'fullname', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
     Observable<{ pagination: UserPagination; data: User[] }>
    {
        return this._httpClient.get<{ pagination: UserPagination; data: User[] }>(environment.apiURL+'users/list?'+'page='+page+'&size='+size+'&sort='+sort+'&order='+order+'&search='+search).pipe(
            tap((response) =>
            {
                this._pagination.next(response.pagination);
                this._users.next(response.data);
            }),
        );
    }

    /**
     * Post a User
     *
     * @param User
     */
    create(user: any): Observable<User>
    {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.post<User>(environment.apiURL+'users/create', user).pipe(
                map((newUser: any) =>
                {
                    // Update the user with the new user
                    this._users.next([...users, newUser.data]);

                    // Return the new user from observable
                    return newUser;
                }),
            )),
        );
    }

    /**
     * Get User
     * 
     * @param user_id
     */
    getUserById(user_id: number): Observable<any>
    {
        return this._httpClient.get<User>(environment.apiURL+'users/details/'+user_id).pipe(
            map((user) =>
            {
                // Update the user
                this._user.next(user);

                // Return the user
                return user;
            }),
            switchMap((user) =>
            {
                if ( !user )
                {
                    return throwError('Could not found user with id of ' + user_id + '!');
                }

                return of(user);
            }),
        );
    }

    /**
     * Update the user
     *
     * @param user_id
     * @param user
     */
    update(user_id: number, user: any): Observable<User>
    {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.put<User>(environment.apiURL+'users/update/'+user_id, user).pipe(
                map((updatedUser: any) =>
                {
                    // Find the index of the updated user
                    const index = users.findIndex(item => item.userId === user_id);

                    // Update the user
                    users[index] = updatedUser.data;

                    // Update the user
                    this._users.next(users);

                    // Return the updated user
                    return updatedUser.data;
                }),
            )),
        );
    }

    /**
     * Delete
     *
     * @param user_id
     */
    delete(user_id: number): Observable<boolean>
    {
        return this.users$.pipe(
            take(1),
            switchMap(users => this._httpClient.delete<boolean>(environment.apiURL+'users/delete/'+user_id).pipe(
                map((isDeleted: boolean) =>
                {
                    // Find the index of the deleted user
                    const index = users.findIndex(item => item.userId === user_id);

                    // Delete the user
                    users.splice(index, 1);

                    // Update the user
                    this._users.next(users);

                    // Return the deleted status
                    return isDeleted;
                }),
            )),
        );
    }
}
