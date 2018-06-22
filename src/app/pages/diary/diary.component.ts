import { Component, ViewChild} from '@angular/core';
import {EditorComponent} from '../components/wang-editor/editor.component';
import {NoticeComponent} from '../components/notice/notice.component';
import {HttpCommonUtils} from '../../services/http.common.utils';
@Component({
  selector: 'ngx-diary',
  styleUrls: ['./diary.component.scss'],
  templateUrl: './diary.component.html',
})
export class DiaryComponent {
  @ViewChild(EditorComponent) editor: EditorComponent;

  @ViewChild(NoticeComponent) notice: NoticeComponent;

  constructor(private httpCommonUtils: HttpCommonUtils) {
  }

  saveDiary() {

    // 获取富文本的内容
    const content = this.editor.clickHandle();
    console.info(content);
    if ('<p><br></p>' === content) {
      this.notice.showNotice('', '', '');
    }

    // 保存数据库

  }

}
