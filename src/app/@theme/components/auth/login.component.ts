import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NB_AUTH_OPTIONS, NbAuthSocialLink} from '@nebular/auth/auth.options';
import {getDeepFromObject} from '@nebular/auth/helpers';

import {NbAuthService} from '@nebular/auth/services/auth.service';
import {NbAuthResult} from '@nebular/auth/services/auth-result';
import {TranslateService} from '@ngx-translate/core';
import {NbTokenService} from '@nebular/auth/services/token/token.service';
import {HttpInterceptorService} from '../../../services/http.interceptor.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
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
              private translateService: TranslateService,
              private httpClientUtils: HttpInterceptorService) {

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
    console.info(this.user);

    this.httpClientUtils.post('http://localhost:8091/api/v1/web/login',
      {'username': '1231231', 'password': '123231'}).subscribe(result => {

        // 请求成功处理数据
        console.info(result.data);
    });
    /*this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {
      console.info(123123123);
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
    });*/
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
