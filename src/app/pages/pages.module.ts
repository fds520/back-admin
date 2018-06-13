import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    NgZorroAntdModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  exports: [
    NgZorroAntdModule
  ]
})
export class PagesModule {
}
