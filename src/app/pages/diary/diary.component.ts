import { Component, ViewChild} from '@angular/core';
import {EditorComponent} from '../components/wang-editor/editor.component';
import {HttpCommonUtils} from '../../services/http.common.utils'
@Component({
  selector: 'ngx-diary',
  styleUrls: ['./diary.component.scss'],
  templateUrl: './diary.component.html',
})
export class DiaryComponent {
  @ViewChild(EditorComponent) editor: EditorComponent;

  constructor(public httpCommonUtils: HttpCommonUtils) {
  }

  saveDiary() {

    // 获取富文本的内容
    const topicContent = this.editor.clickHandle();
    if (!topicContent) {
      alert('请输入内容！');
      return;
    }

    // 保存数据库

  }

}
