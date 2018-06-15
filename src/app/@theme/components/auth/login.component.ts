import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {NB_AUTH_OPTIONS} from '@nebular/auth/auth.options';
import {getDeepFromObject} from '@nebular/auth/helpers';
import {HttpCommonUtils} from '../../../services/http.common.utils';
import md5 from 'js-md5';
import {StorageUtils} from '../../../services/storage.utils'
import {ApiUrl} from '../../../services/api.url';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent {

  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(@Inject(NB_AUTH_OPTIONS) protected config = {},
              protected router: Router,
              private httpCommonUtils: HttpCommonUtils,
              private storageUtils: StorageUtils) {
  }

  login(): void {
    this.submitted = true;
    this.httpCommonUtils.post(ApiUrl.user.login,
      {'username': this.user.username, 'password': md5(this.user.password + 'fds')}).subscribe(result => {
        const resultData = result.data;
        if (resultData.status === '1') {

          // 设置token
          this.storageUtils.setLocalStorage('token', resultData.token);

          // 登陆成功跳转首页
          this.router.navigate(['/pages/dashboard']);
        } else if (resultData.status === '2') {

          // 密码错误
          this.submitted = false;
          this.showMessages.error = true;
          this.showMessages.msg = '密码错误';
        } else if (resultData.status === '0') {

          // 用户不存在
          this.submitted = false;
          this.showMessages.error = true;
          this.showMessages.msg = '用户不存在';
        }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

}
