import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { MessagesComponent } from 'app/layout/common/messages/messages.component';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { QuickChatComponent } from 'app/layout/common/quick-chat/quick-chat.component';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { ShortcutsComponent } from 'app/layout/common/shortcuts/shortcuts.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'futuristic-layout',
    templateUrl: './futuristic.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        FuseLoadingBarComponent,
        FuseVerticalNavigationComponent,
        UserComponent,
        MatButtonModule,
        MatIconModule,
        FuseFullscreenComponent,
        SearchComponent,
        ShortcutsComponent,
        MessagesComponent,
        NotificationsComponent,
        RouterOutlet,
        QuickChatComponent,
    ],
})
export class FuturisticLayoutComponent implements OnInit, OnDestroy {
    
    isScreenSmall: boolean;
    navigation: any;
    fullname: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _router: Router,
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.fullname = this._authService.accessFullname;

        if (this._authService.customDecode(this._authService.accessAdmin) == '1') {
            this.navigation =  [
                {
                    id   : 'dashboard.system',
                    title: 'หน้าหลัก',
                    type : 'basic',
                    icon : 'heroicons_outline:chart-pie',
                    link : 'dashboard-system'
                },
                {
                    id   : 'machines-work',
                    title: 'ตรวจวัด',
                    type : 'basic',
                    icon : 'heroicons_outline:clipboard-document-list',
                    link : '/machines-work'
                },
                {
                    id   : 'patients',
                    title: 'ผู้ป่วย',
                    type : 'basic',
                    icon : 'heroicons_outline:users',
                    link : '/patients'
                },
                {
                    id   : 'drugs',
                    title: 'ยา',
                    type : 'basic',
                    icon : 'heroicons_outline:list-bullet',
                    link : '/drugs'
                },
                {
                    id   : 'zones',
                    title: 'Zone',
                    type : 'basic',
                    icon : 'heroicons_outline:map',
                    link : '/zones'
                },
                {
                    id   : 'machines',
                    title: 'เครื่อง',
                    type : 'basic',
                    icon : 'heroicons_outline:adjustments-horizontal',
                    link : '/machines'
                },
                {
                    id      : 'setting',
                    title   : 'ตั้งค่าระบบ',
                    type    : 'collapsable',
                    icon    : 'heroicons_outline:cog-8-tooth',
                    children: [
                        {
                            id    : 'setting.other',
                            title : 'ทั่วไป',
                            type  : 'basic',
                            link  : '/setting/other',
                        },
                        {
                            id   : 'setting.user',
                            title: 'ผู้ใช้งาน',
                            type : 'basic',
                            link : '/setting/user',
                        },
                    ]
                }
            ];
        } else {
            this.navigation =  [
                {
                    id   : 'dashboard.system',
                    title: 'หน้าหลัก',
                    type : 'basic',
                    icon : 'heroicons_outline:chart-pie',
                    link : 'dashboard-system'
                },
                {
                    id   : 'machines-work',
                    title: 'ตรวจวัด',
                    type : 'basic',
                    icon : 'heroicons_outline:clipboard-document-list',
                    link : '/machines-work'
                },
                {
                    id   : 'patients',
                    title: 'ผู้ป่วย',
                    type : 'basic',
                    icon : 'heroicons_outline:users',
                    link : '/patients'
                },
                {
                    id   : 'drugs',
                    title: 'ยา',
                    type : 'basic',
                    icon : 'heroicons_outline:list-bullet',
                    link : '/drugs'
                },
                {
                    id   : 'zones',
                    title: 'Zone',
                    type : 'basic',
                    icon : 'heroicons_outline:map',
                    link : '/zones'
                },
                {
                    id   : 'machines',
                    title: 'เครื่อง',
                    type : 'basic',
                    icon : 'heroicons_outline:adjustments-horizontal',
                    link : '/machines'
                }
            ];
        }

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
