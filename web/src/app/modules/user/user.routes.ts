import { Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserService } from '@app/core/user/user.service';
import { inject } from '@angular/core';

export default [
    {
        path: '',
        component: UserComponent,
        resolve  : {
            users    : () => inject(UserService).getUser(),
            positions    : () => inject(UserService).getPositionAll(),
        },
    },
] as Routes;
