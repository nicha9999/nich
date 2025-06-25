import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, interval, map, merge, Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { TooltipPosition, MatTooltipModule, MatTooltip} from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [NgIf, NgxMatSelectSearchModule, MatTableModule, MatCheckboxModule, MatTooltipModule, MatProgressBarModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSortModule, NgFor, NgTemplateOutlet, MatPaginatorModule, NgClass, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule, AsyncPipe, CurrencyPipe, MatTooltip],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent implements OnInit, AfterViewInit, OnDestroy
{
 
  refreshSubscription: Subscription | undefined;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
  )
  {
  }

  /**
 * On init
 */
  ngOnInit(): void
  {
    
  }

  /**
   * After view init
   */
  ngAfterViewInit(): void
  {
    
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
  
}
