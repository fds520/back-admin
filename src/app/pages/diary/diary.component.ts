import { Component, ViewChild, OnInit} from '@angular/core';
import {EditorComponent} from '../components/wang-editor/editor.component';
import {NoticeComponent} from '../components/notice/notice.component';
import {HttpCommonUtils} from '../../services/http.common.utils';
import {ApiUrl} from '../../services/api.url';

@Component({
  selector: 'ngx-diary',
  styleUrls: ['./diary.component.scss'],
  templateUrl: './diary.component.html',
})
export class DiaryComponent implements OnInit {

  @ViewChild(EditorComponent) editor: EditorComponent;

  @ViewChild(NoticeComponent) notice: NoticeComponent;

  public title: string;

  public introduceInfo: string;

  public imageAddress: string;

  public isUpload= true;

  // 文章分类code
  public categoryCode: string;

  public isPublic: Boolean = false;

  ngOnInit(): void {
    // 获取分类
    this.getCategoryList();
  }

  ngAfterViewInit() {
    const thisObj = this;
    const uploader = Qiniu.uploader({
      // 上传模式,依次退化
      runtimes: 'html5,flash,html4',
      // 上传选择的点选按钮，**必需**
      browse_button: 'uploadImg',
      uptoken_url: ApiUrl.qiniu.getToken,
      // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
      get_new_uptoken: false,
      unique_names: true,
      domain: 'http://p55u9pzhh.bkt.clouddn.com',
      container: 'imgHref',
      max_file_size: '2mb',
      filters: {
        mime_types: [
          { title: '图片文件', extensions: 'jpg,gif,png,bmp' }
        ]
      },
      max_retries: 3,                   // 上传失败最大重试次数
      dragdrop: false,                   // 开启可拖曳上传
      chunk_size: '2mb',                // 分块上传时，每片的体积
      auto_start: true,                 // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
      init: {
        'FilesAdded': function(up, files) {
          plupload.each(files, function(file) {
            // 文件添加进队列后,处理相关的事情
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
          console.info(sourceLink);
          thisObj.imageAddress = sourceLink;
          thisObj.isUpload = false;
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

  constructor(private httpCommonUtils: HttpCommonUtils) {
  }

  getCategoryList() {
    this.httpCommonUtils.get(ApiUrl.category.list, {}).subscribe((data) => {
      console.info(data)
    })
  }

  // 保存文章
  saveDiary() {

    if (this.title === '' || this.title == null) {
      this.notice.showNotice('waring', '警告', '请填写文章标题');
      return;
    }

    if (this.introduceInfo === '' || this.introduceInfo == null) {
      this.notice.showNotice('waring', '警告', '请填写文章导语');
      return;
    }

    if (this.imageAddress === '' || this.imageAddress == null) {
      this.notice.showNotice('waring', '警告', '请上传图片');
      return;
    }

    // 获取富文本的内容
    const content = this.editor.clickHandle();

    if ('<p><br></p>' === content) {
      this.notice.showNotice('waring', '警告', '请填写文章内容');
      return;
    }

    console.info(content);
    this.httpCommonUtils.post(ApiUrl.article.save, {
      'title': this.title,

      // 编码过滤 % #@ 等特殊符号，不编码后台无法接收。
      'content': content,
      'isPublic': this.isPublic ? '1' : '0',
      'introduceInfo': this.introduceInfo,
      'imageAddress': this.imageAddress,
      'categoryCode': '1'
    }).subscribe(() => {

      // 保存成功；
      this.notice.showNotice('success', '提示', '保存成功');
      window.location.reload();
    })
  }

}
