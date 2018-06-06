import {HttpRequest, HttpClient, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.info('请求前');
    return next.handle(req);
  }

}
