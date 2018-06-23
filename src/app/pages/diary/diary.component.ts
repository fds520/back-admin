import { Component, ViewChild} from '@angular/core';
import {EditorComponent} from '../components/wang-editor/editor.component';
import {NoticeComponent} from '../components/notice/notice.component';
import {HttpCommonUtils} from '../../services/http.common.utils';
import {ApiUrl} from '../../services/api.url';

@Component({
  selector: 'ngx-diary',
  styleUrls: ['./diary.component.scss'],
  templateUrl: './diary.component.html',
})
export class DiaryComponent {
  @ViewChild(EditorComponent) editor: EditorComponent;

  @ViewChild(NoticeComponent) notice: NoticeComponent;

  private title: string;

  private isPublic: Boolean = false;

  constructor(private httpCommonUtils: HttpCommonUtils) {
  }

  saveDiary() {

    // 获取富文本的内容
    const content = this.editor.clickHandle();

    if ('<p><br></p>' === content) {
      this.notice.showNotice('waring', '警告', '请填写内容');
      return;
    }

    console.info(content);
    this.httpCommonUtils.post(ApiUrl.diaryInfo.save, {
      'title': this.title,

      // 编码过滤 % #@ 等特殊符号，不编码后台无法接收。
      'content': encodeURI(content),
      'isPublic': this.isPublic ? '1' : '0'
    }).subscribe(() => {

      // 保存成功；
      this.notice.showNotice('success', '提示', '保存成功');
    })

  }

}
