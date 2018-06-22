import {Component} from '@angular/core';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-notice',
  templateUrl: './notice.component.html',
})
export class NoticeComponent {

  public config: ToasterConfig;

  constructor(private toasterService: ToasterService) {
    this.config = new ToasterConfig({
      positionClass: 'toast-top-center',
      limit: 5
    });
  }

  showNotice(type: string, title: string, body: string): void {
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml
    };
    this.toasterService.popAsync(toast);
  }
}
