import { Component, ViewChild} from '@angular/core';
import {HttpCommonUtils} from '../../services/http.common.utils'
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(public httpCommonUtils: HttpCommonUtils) {
  }

  /*publishTopic() {

    const topicContent = this.editor.clickHandle();
    if (!topicContent) {
      alert('请输入内容！');
      return;
    }
    alert(topicContent);
  }

  postData(event): void {
    console.info(event);
  }*/

  test1(): void {
    console.info('12312313')
    this.httpCommonUtils.get('http://localhost:8091/api/recordinfo/getlist', {}).subscribe((result) => {

    });
    console.info('结束')
  }
}
