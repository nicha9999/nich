import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    set accessFullname(fullname: string) {
        localStorage.setItem('accessFullname', fullname);
    }

    get accessFullname(): string {
        return localStorage.getItem('accessFullname') ?? '';
    }

    set accessUserId(userId: string) {
        localStorage.setItem('accessUserId', userId);
    }

    get accessUserId(): string {
        return localStorage.getItem('accessUserId') ?? '';
    }

    /**
     * Setter & getter for admin
     */
    set accessAdmin(admin: string)
    {
        localStorage.setItem('accessAdmin', admin);
    }

    get accessAdmin(): string
    {
        return localStorage.getItem('accessAdmin') ?? '';
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    customEncode(data: string): string {
        // Custom encoding logic here
        return btoa(data.split('').reverse().join(''));
    }
    
    customDecode(encodedData: string): string {
        // Custom decoding logic here
        return atob(encodedData).split('').reverse().join('');
    }


    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { username: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(environment.apiURL+'auth/login', credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.data[0].token;
                this.accessFullname = response.data[0].fullname;
                this.accessUserId = response.data[0].userId;
                this.accessAdmin = this.customEncode(response.data[0].isAdmin);

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                // this._userService.user = response.data;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient.get(environment.apiURL+'auth/checkToken').pipe(
            catchError(() =>
                // Return false
                of(false),
            ),
            switchMap((response: any) =>
            {
                if (response.ok) {
                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Return true
                    return of(true);
                } else {
                    // Return false
                    return of(false);
                }
            }),
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessFullname');
        localStorage.removeItem('accessUserId');
        localStorage.removeItem('accessAdmin');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
