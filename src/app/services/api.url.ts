import {environment} from '../../environments/environment';
export const ApiUrl = {
  user: {
    // 登录接口
    login: environment.apiBase + '/login'
  },
  qiniu: {
    getToken: environment.apiBase + '/fileUpload/getAuth'
  },
  article: {
    save: environment.apiBase + '/article/save'
  },
  category: {
    // 获取分类接口
    list: environment.apiBase + '/category/list'
  },
  webSocket: {
    user: environment.webSocketApi + '/simple-life/webSocket'
  }
}
