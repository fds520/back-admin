import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import {StorageUtils} from './storage.utils';
@Injectable()
export class LoginAuthService implements CanActivate {

  constructor(private router: Router,
              private storageUtils: StorageUtils) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // 返回值 true: 跳转到当前路由 false: 不跳转到当前路由
    // 当前路由名称
    if (this.storageUtils.getLocalStorage('token')) {
      console.info('允许访问');
      this.router.navigate(['/pages/dashboard']);
      return false;
    } else {
      return true;
    }

  }
}
