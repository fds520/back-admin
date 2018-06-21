import {NgModule} from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { DiaryComponent } from './diary.component';
import {EditorComponent} from '../components/wang-editor/editor.component';
@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    DiaryComponent,
    EditorComponent
  ],
})
export class DiaryModule {}
