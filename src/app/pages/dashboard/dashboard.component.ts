import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  public count: string;

  ngOnInit(): void {
    console.info('weboscket初始化连接');
    const thisContent = this;
    let websocket = null;
    // 判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
      websocket = new WebSocket('ws://192.168.20.64:8091/simple-life/webSocket?userId=wrwefesdfwetrwe324324');
    } else {
      alert('当前浏览器 Not support websocket')
    }

    // 连接发生错误的回调方法
    websocket.onerror = function () {
      setMessageInnerHTML('WebSocket连接发生错误');
    };

    // 连接成功建立的回调方法
    websocket.onopen = function () {
      setMessageInnerHTML('WebSocket连接成功');
    }

    // 接收到消息的回调方法
    websocket.onmessage = function (event) {
      thisContent.changeCount(event.data);
    }

    // 连接关闭的回调方法
    websocket.onclose = function () {
      setMessageInnerHTML('WebSocket连接关闭');
    }

    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
      closeWebSocket();
    }

    // 将消息显示在网页上
    function setMessageInnerHTML(innerHTML) {
    }

    // 关闭WebSocket连接
    function closeWebSocket() {
      websocket.close();
    }

    // 发送消息
    function send() {
      const message = document.getElementById('text').valueOf();
      websocket.send(message);
    }
  }

  changeCount(count) {
      this.count = count;
  }

}
