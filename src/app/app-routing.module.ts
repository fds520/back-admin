import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {LoginAuthService} from './services/login.auth.service'
import {
  NbAuthComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

import {NgxLoginComponent} from './@theme/components/auth/login.component';
import {NgxRegisterComponent} from './@theme/components/auth/register.component';
const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NbAuthComponent,
    canActivate: [LoginAuthService],
    children: [
      {
        path: '',
        component: NgxLoginComponent,
        canActivate: [LoginAuthService],
      },
      {
        path: 'login',
        component: NgxLoginComponent,
        canActivate: [LoginAuthService],
      },
      {
        path: 'register',
        component: NgxRegisterComponent,
        canActivate: [LoginAuthService],
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
        canActivate: [LoginAuthService],
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
        canActivate: [LoginAuthService],
      },
      {
        path: 'reset-password',
        component: NbRequestPasswordComponent,
        canActivate: [LoginAuthService],
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
