import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, NgForm, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Observable, ReplaySubject, Subject, map, of, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';
import { User } from '@app/core/user/user.types';
import { MatFormField, MatLabel, MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'user-modal',
  standalone: true,
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, MatButtonModule, MatSelect, MatFormField, MatLabel, MatSelectModule, MatIconModule, FormsModule, TextFieldModule, NgFor, MatCheckboxModule, NgClass, MatRippleModule, MatMenuModule, MatDialogModule, AsyncPipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class UserModalComponent implements OnInit, OnDestroy 
{
  @ViewChild('f', { static: true }) _formMain: NgForm;
 
  user$: Observable<User>;

  title = 'เพิ่มผู้ใช้งาน';
  saveClick = false;
  statusActionEdit = false;

  fullname: string;
  username: string;
  password: string;
  picDisplay: string;
  positionId: number;
  email: string;
  isAdmin: number;
  active = false;
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
     * Constructor
     */
  constructor(
      private _changeDetectorRef: ChangeDetectorRef,
      @Inject(MAT_DIALOG_DATA) private _data: { user: User },
      private _userService: UserService,
      private _matDialogRef: MatDialogRef<UserModalComponent>,
      private snackBar: MatSnackBar
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {

    if ( this._data.user.userId )
    {
      // Edit
      this.title = 'แก้ไขผู้ใช้งาน';
      this.statusActionEdit = true;

      this.fullname = this._data.user.fullname;
      this.username = this._data.user.username;
      this.password = this._data.user.password;
      this.picDisplay = 'data:image/jpeg;base64,'+this._data.user.pic;
      this.email = this._data.user.email;
      this.isAdmin = Number(this._data.user.isAdmin);

      if (this._data.user.active == 'Y') {
        this.active = true;
      }

      // Mark for check
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  //file to base64
  convertFile(file: File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }


   /**
   * Create / Update => user
   *
   */
   async save() 
   {
     this.saveClick = true;
 
     if (this._formMain.invalid) {
       return;
     }
 
     this.saveClick = false;
 
     try {
       const data = {
        fullname: this._formMain.value.fullname,
        username: this._formMain.value.username,
        password: this._formMain.value.password,
        email: this._formMain.value.email,
        is_admin: this._formMain.value.isAdmin,
        active: (this._formMain.value.active == true) ? 'Y' : 'N'
       };
 
       if ( this._data.user.userId )
       {
         // Update
         this._userService.update(this._data.user.userId, data).subscribe(() =>
         {
           this.snackBar.open('บันทึกข้อมูลเรียบร้อย', 'Close', {
             horizontalPosition: 'center', 
             verticalPosition: 'top',
             duration: 2000, 
             panelClass: ['snackbar-success'],
           });
 
           // Close the modal
           this.close();
         });
       }
       else
       {
         // Create
         this._userService.create(data).pipe(
         map(() =>
         {
           // Get the user
           this.user$ = this._userService.user$;
 
           this.snackBar.open('บันทึกข้อมูลเรียบร้อย', 'Close', {
             horizontalPosition: 'center', 
             verticalPosition: 'top',
             duration: 2000, 
             panelClass: ['snackbar-success'],
           });
 
           // Close the modal
           this.close();
         })).subscribe();
       }
     } catch (error) {
       this.snackBar.open('ไม่สามารถบันทึกข้อมูลได้', 'Close', {
         horizontalPosition: 'center', 
         verticalPosition: 'top',
         duration: 2000, 
         panelClass: ['snackbar-error'],
       });
     }
   }
 
   /**
    * close
    */
   close(): void
   {
     // Close the dialog
     this._matDialogRef.close();
   }

}