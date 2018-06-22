import {NgModule} from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DiaryComponent } from './diary.component';
import {EditorComponent} from '../components/wang-editor/editor.component';
import {NoticeComponent} from '../components/notice/notice.component';
import { ToasterModule } from 'angular2-toaster';
@NgModule({
  imports: [
    ThemeModule,
    ToasterModule
  ],
  declarations: [
    DiaryComponent,
    EditorComponent,
    NoticeComponent
  ],
})
export class DiaryModule {}
