import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {StorageUtils} from './storage.utils';
import {Router} from '@angular/router';
@Injectable()
export class HttpCommonUtils {

  // 请求头
  private headers: HttpHeaders;

  constructor(private http: HttpClient,
              private storageUtils: StorageUtils,
              private router: Router) {
    // 请求头配置
    this.headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
      .set('token', storageUtils.getLocalStorage('userInfo'));
  }

  /**
   * get请求
   * @param {string} url 请求地址
   * @param params 传递的参数
   * @returns {any}
   */
  get(url: string, params?: any): any {
    return this.intercept(this.http.get(environment.apiBase + url, {headers: this.headers, params: params}));
  }

  /**
   * post请求
   * @param {string} url
   * @param body
   * @returns {any}
   */
  post(url: string, body): any {
    return this.intercept(this.http.post(environment.apiBase + url, this.transformRequest(body),
      {headers: this.headers}));
  }

  // 将json转换成key -value & 格式
  transformRequest(data) {
    let str = '';
    for (const i in data) {
      if (i != null) {
        str += i + '=' + data[i] + '&';
      }
    }
    str.substring(0, str.length - 1);
    return str;
  };

  // 拦截请求的返回值
  intercept(observable: Observable<any>): Observable<any> {
    return Observable.create((observer) => {
      observable.subscribe(res => {
        const code = res.code;
        if (code === 10000) {
          console.info('请求成功');
        } else if (code === 10001) {
          console.info('参数错误');
        } else if (code === 10002) {
          console.info('token非法；重新登陆');
          this.router.navigate(['/auth/login']);
        } else {
          console.info('服务器偷懒了~~');
        }
          // 正确的请求
        observer.next(res);
      }, (err) => {

        // 请求错误
        console.info(err);
        console.info('http请求错误');
        observer.error(err);
      }, () => {
        observer.complete();
      });
    });
  }

}
