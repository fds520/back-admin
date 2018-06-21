import {NgModule} from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DiaryComponent } from './diary.component';
import {EditorComponent} from '../components/wang-editor/editor.component';
@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    DiaryComponent,
    EditorComponent
  ],
})
export class DiaryModule {}
