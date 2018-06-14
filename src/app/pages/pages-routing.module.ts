import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {AuthService} from '../auth.service';
import {NgZorroAntdModule} from 'ng-zorro-antd';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService]
  }, {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
    canActivate: [AuthService]
  }, {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
    canActivate: [AuthService]
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
    canActivate: [AuthService]
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
    canActivate: [AuthService]
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
    canActivate: [AuthService]
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
    canActivate: [AuthService]
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
    canActivate: [AuthService]
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
    canActivate: [AuthService]
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes), NgZorroAntdModule],
  exports: [RouterModule],
  providers: [AuthService]
})
export class PagesRoutingModule {
}
