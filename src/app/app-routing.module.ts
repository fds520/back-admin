import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbAuthModule,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
  NbEmailPassAuthProvider
} from '@nebular/auth';

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
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
  imports: [RouterModule.forRoot(routes, config),
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {
            baseEndpoint: '',
            login: {
              alwaysFail: false,
              rememberMe: true,
              endpoint: '/api/auth/login',
              method: 'post',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Login/Email combination is not correct, please try again.'],
              defaultMessages: ['You have been successfully logged in.'],
            },
            register: {
              alwaysFail: false,
              rememberMe: true,
              endpoint: '/api/auth/register',
              method: 'post',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['You have been successfully registered.'],
            },
            logout: {
              alwaysFail: false,
              endpoint: '/api/auth/logout',
              method: 'delete',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['You have been successfully logged out.'],
            },
            requestPass: {
              endpoint: '/api/auth/request-pass',
              method: 'post',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['Reset password instructions have been sent to your email.'],
            },
            resetPass: {
              endpoint: '/api/auth/reset-pass',
              method: 'put',
              redirect: {
                success: '/',
                failure: null,
              },
              resetPasswordTokenKey: 'reset_password_token',
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['Your password has been successfully changed.'],
            },
            refreshToken: {
              endpoint: '/api/auth/refresh-token',
              method: 'post',
              redirect: {
                success: null,
                failure: null,
              },
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['Your token has been successfully refreshed.'],
            },
            /*token: {
              key: 'data.token',
              getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
                this.getConfigValue('token.key')),
            },
            errors: {
              key: 'data.errors',
              getter: (module: string, res: HttpErrorResponse) => getDeepFromObject(res.error,
                this.getConfigValue('errors.key'),
                this.getConfigValue(`${module}.defaultErrors`)),
            },
            messages: {
              key: 'data.messages',
              getter: (module: string, res: HttpResponse<Object>) => getDeepFromObject(res.body,
                this.getConfigValue('messages.key'),
                this.getConfigValue(`${module}.defaultMessages`)),
            },*/
          }
        }
      }
    })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
