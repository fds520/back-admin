import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NB_AUTH_OPTIONS} from '@nebular/auth/auth.options';
import {getDeepFromObject} from '@nebular/auth/helpers';
import {HttpCommonUtils} from '../../../services/http.common.utils';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent implements OnInit {

  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(@Inject(NB_AUTH_OPTIONS) protected config = {},
              protected router: Router,
              private httpCommonUtils: HttpCommonUtils) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.submitted = true;
    console.info(this.user.username);
    console.info(this.user.password);

    this.httpCommonUtils.post('/web/api/v1/login',
      {'username': this.user.username, 'password': this.user.password}).subscribe(result => {

        // 请求成功处理数据
        console.info(result.data);
      this.router.navigate(['/pages/dashboard']);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

}
