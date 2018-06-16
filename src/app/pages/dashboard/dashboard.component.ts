import { Component, ViewChild} from '@angular/core';
import {EditorComponent} from './wang-editor/editor.component';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  @ViewChild(EditorComponent) editor: EditorComponent;

  constructor() {}

  publishTopic() {

    const topicContent = this.editor.clickHandle();
    if (!topicContent) {
      alert('请输入内容！');
      return;
    }
    alert(topicContent);
  }

  PostData(event): void {
    console.info(event);
  }
}
