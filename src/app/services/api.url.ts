import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
export const ApiUrl = {
  user: {
    // 登录接口
    login: environment.apiBase + '/web/api/v1/login'
  },
  qiniu: {
    getToken: environment.apiBase + '/web/api/v1/fileUpload/getAuth'
  }
}
