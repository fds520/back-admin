import {ElementRef, Output, EventEmitter, Component} from '@angular/core';
import * as WangEditor from 'wangeditor/release/wangEditor.js';
import {ApiUrl} from '../../services/api.url';

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
    this.editor.customConfig.qiniu = true;
    this.editor.create();
    this.uploadInit();
  }

  clickHandle(): any {
    return this.editor.txt.html();
  }

// 初始化七牛上传的方法
  uploadInit() {
    // 获取相关 DOM 节点的 ID
    const btnId = this.editor.imgMenuId;
    const containerId = this.editor.toolbarElemId;
    const textElemId = this.editor.textElemId;

    const  ed = this.editor;

    // 创建上传对象
    const uploader = Qiniu.uploader({
      // 上传模式,依次退化
      runtimes: 'html5,flash,html4',
      // 上传选择的点选按钮，**必需**
      browse_button: btnId,
      uptoken_url: ApiUrl.qiniu.getToken,
      // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
      get_new_uptoken: false,
      unique_names: true,
      domain: 'http://p55u9pzhh.bkt.clouddn.com',
      container: containerId,
      max_file_size: '3mb',
      filters: {
        mime_types: [
          { title: '图片文件', extensions: 'jpg,gif,png,bmp' }
        ]
      },
      max_retries: 3,                   // 上传失败最大重试次数
      dragdrop: true,                   // 开启可拖曳上传
      drop_element: textElemId,        // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
      chunk_size: '4mb',                // 分块上传时，每片的体积
      auto_start: true,                 // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
      init: {
        'FilesAdded': function(up, files) {
          plupload.each(files, function(file) {
            // 文件添加进队列后,处理相关的事情
            console.info(file);
          });
        },
        'BeforeUpload': function(up, file) {
          // 每个文件上传前,处理相关的事情
        },
        'UploadProgress': function(up, file) {
          // 显示进度
        },
        'FileUploaded': function(up, file, info) {
          const sourceLink = up.getOption('domain') + '/' + $.parseJSON(info).key; // 获取上传成功后的文件的Url
          // 插入图片到editor
          ed.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
          console.info(sourceLink);
        },
        'Error': function(up, err, errTip) {
          // 上传出错时,处理相关的事情
        },
        'UploadComplete': function() {
          // 队列文件处理完毕后,处理相关的事情
        }
      }
    });
  }
}
