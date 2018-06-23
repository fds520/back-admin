import {environment} from '../../environments/environment';
export const ApiUrl = {
  user: {
    // 登录接口
    login: environment.apiBase + '/login'
  },
  qiniu: {
    getToken: environment.apiBase + '/fileUpload/getAuth'
  },
  diaryInfo: {
    save: environment.apiBase + '/diaryInfo/save'
  }
}
