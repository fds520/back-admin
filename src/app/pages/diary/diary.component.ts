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

  publishTopic() {

    const topicContent = this.editor.clickHandle();
    if (!topicContent) {
      alert('请输入内容！');
      return;
    }
    alert(topicContent);
  }

  postData(event): void {
    console.info(event);
  }

  test1(): void {
    console.info('12312313')
    this.httpCommonUtils.get('http://localhost:8091/api/recordinfo/getlist', {}).subscribe((result) => {

    });
    console.info('结束')
  }
}
