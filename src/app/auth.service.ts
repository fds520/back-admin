import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // 返回值 true: 跳转到当前路由 false: 不跳转到当前路由
    // 当前路由名称
    console.info('转跳登陆页面');
    this.router.navigate(['/auth/login']);
    return false;
  }
}
