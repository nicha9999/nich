import { Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { inject } from '@angular/core';

export default [
    {
        path     : '',
        component: SystemComponent,
    },
] as Routes;