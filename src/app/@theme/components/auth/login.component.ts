import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {NB_AUTH_OPTIONS} from '@nebular/auth/auth.options';
import {getDeepFromObject} from '@nebular/auth/helpers';
import {HttpCommonUtils} from '../../../services/http.common.utils';
import md5 from 'js-md5';
import {StorageUtils} from '../../../services/storage.utils'
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
    this.showMessages.error = true;
    this.submitted = false;
    this.storageUtils.setLocalStorage('add', '12312');
    this.storageUtils.setCookie('uuid', 'sfdsfewfew');
    this.httpCommonUtils.post('/web/api/v1/login',
      {'username': this.user.username, 'password': md5(this.user.password + 'fds')}).subscribe(result => {

        // 请求成功处理数据
        console.info(result.data);
        this.router.navigate(['/pages/dashboard']);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }

}
