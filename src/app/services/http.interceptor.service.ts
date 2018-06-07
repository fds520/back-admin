import {HttpRequest, HttpClient, HttpHeaders, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpInterceptorService {

  // 请求头
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    // 请求头配置
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
  }

  /**
   * get请求
   * @param {string} url 请求地址
   * @param params 传递的参数
   * @returns {any}
   */
  get(url: string, params?: any): any {
    console.info('开始请求')
    return this.intercept(this.http.get(url, {headers: this.headers, params: params}));
  }

  /**
   * post请求
   * @param {string} url
   * @param body
   * @returns {any}
   */
  post(url: string, body): any {
    return this.intercept(this.http.post(url, this.transformRequest(body), {headers: this.headers}));
  }

  // 将json转换成key -value & 格式
  transformRequest(data) {
    let str = '';
    for (let i in data) {
      str += i + '=' + data[i] + '&';
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
          console.info('token非法');
        } else {
          console.info('服务器偷懒了~~');
        }
          // 正确的请求
        observer.next(res);
      }, (err) => {

        // 请求错误
        console.info(err)
        console.info('http请求错误');
        observer.error(err);
      }, () => {
        observer.complete();
      });
    });
  }

}
