import {ElementRef, Output, EventEmitter, Component} from '@angular/core';
import * as WangEditor from 'wangeditor/release/wangEditor.js'
@Component({
  selector: 'ngx-editor',
  templateUrl: './editor.component.html',
})
export class EditorComponent {

  private editor: any;
  @Output() onPostData = new EventEmitter()
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.editor = new WangEditor(this.el.nativeElement.querySelector('#editorElem'));
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.create();
  }

  clickHandle(): any {
    return this.editor.txt.html();
  }
}
