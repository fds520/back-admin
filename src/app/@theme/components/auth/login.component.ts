import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NB_AUTH_OPTIONS, NbAuthSocialLink} from '@nebular/auth/auth.options';
import {getDeepFromObject} from '@nebular/auth/helpers';

import {NbAuthService} from '@nebular/auth/services/auth.service';
import {NbAuthResult} from '@nebular/auth/services/auth-result';
import {TranslateService} from '@ngx-translate/core';
import {NbTokenService} from '@nebular/auth/services/token/token.service';

@Component({
  selector: 'ngx-login',
  template: `
    <nb-auth-block>
      <h2 class="title">{{'auth.login.signIn' | translate}}</h2>
      <small class="form-text sub-title">{{'auth.login.signTitle' | translate}}</small>

      <form (ngSubmit)="login()" #form="ngForm" autocomplete="nope">

        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>{{'auth.login.failed' | translate}}</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>

        <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
             class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>

        <div class="form-group">
          <label for="input-email" class="sr-only">{{'auth.login.emailAddress' | translate}}</label>
          <input name="email" [(ngModel)]="user.email" id="input-email" pattern=".+@.+\..+"
                 class="form-control" placeholder="{{'auth.login.phone' | translate}}" #email="ngModel"
                 [class.form-control-danger]="email.invalid && email.touched" autofocus
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.required">
            {{'auth.login.emailRequired' | translate}}
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors?.pattern">
            {{'auth.login.emailError' | translate}}
          </small>
        </div>

        <div class="form-group">
          <label for="input-password" class="sr-only">Password</label>
          <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
                 class="form-control" placeholder="{{'auth.login.password' | translate}}" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required">
            {{'auth.login.passwordRequired' | translate}}
          </small>
          <small
            class="form-text error"
            *ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">
            {{'auth.login.passwordLengthError' | translate}}
          </small>
        </div>

        <div class="form-group accept-group col-sm-12">
          <nb-checkbox name="rememberMe" [(ngModel)]="user.rememberMe">
            {{'auth.login.rememberMe' | translate}}
          </nb-checkbox>
          <a class="forgot-password" routerLink="../request-password">{{'auth.login.forgotPassword' | translate}}</a>
        </div>

        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          {{'auth.login.signIn' | translate}}
        </button>
      </form>

      <div class="links">
        <small class="form-text">
          {{'auth.login.noAccount' | translate}} <a
          routerLink="../register"><strong>{{'auth.login.signUp' | translate}}</strong></a>
        </small>
      </div>
    </nb-auth-block>
  `,
})
export class NgxLoginComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected config = {},
              protected router: Router,
              private nbTokenService: NbTokenService,
              private translateService: TranslateService) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }

  ngOnInit(): void {
    this.nbTokenService.clear();
  }

  login(): void {
    this.submitted = true;
    this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.translateService.get(result.getMessages()[0]).subscribe((res: string) => {
          this.messages.push(res);
        });
      } else {
        this.translateService.get(result.getErrors()[0]).subscribe((res: string) => {
          this.errors.push(res);
        });
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    }, error => {
      this.errors.push(error);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
