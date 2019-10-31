import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { Config } from './config';
import { MyHero } from '../my-hero';

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.css']
})
export class HttpClientComponent implements OnInit {

  constructor(
    private configService: ConfigService
  ) { }

  config: Config;
  headers: any;
  heroes: MyHero[];
  hero: MyHero;

  test() {
    // fetch('http://localhost:3000/heroes/api/?model=hero', {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'text/plain',
    //     'Accept-Language': 'zh-CN',
    //     'Content-Language': 'zh-CN',
    //     'Content-Type': 'text/plain',
    //     'Access-Control-Request-Method': 'DELETE, PUT',
    //     'Access-Control-Request-Headers': 'Content-Type'
    //   },
    //   body: undefined,
    //   referrer: 'http://localhost:4200/http/custom',
    //   referrerPolicy: 'no-referrer-when-downgrade',
    //   mode: 'cors',
    //   keepalive: true
    // }).then(response => response.json())
    //   .then(res => console.log(res));

    const hero1 = {
      id: '5',
      name: 'john'
    };
    const sayHi = 'Hello World';

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/heroes');
    xhr.timeout = 10000; // 设置连接超时，超时时触发ontimeout事件
    xhr.responseType = 'json'; // 响应的数据解析成json格式

    xhr.setRequestHeader('Accept', 'text/plain');
    xhr.setRequestHeader('Accept-Language', 'zh-CN');
    xhr.setRequestHeader('Content-Language', 'zh-CN');
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send(sayHi); // 发送数据
    // xhr.abort();

    // 接收到响应
    xhr.onload = () => {
      console.log(xhr.getAllResponseHeaders());
      console.log(xhr.status, xhr.statusText, xhr.response);
    };
    // 触发错误
    xhr.onerror = () => {
      console.log(new Error('error'));
    };
    // 进度监听
    xhr.onprogress = (event) => {
      console.log(`Received ${event.loaded} of ${event.total}`);
    };
    // 超时
    xhr.ontimeout = () => {
      console.log(`timeout ${xhr.timeout}`);
    };
    // 状态变化监听
    xhr.onreadystatechange = () => {
      console.log('state:', xhr.readyState);
    };
    // 中止请求监听
    xhr.onabort = () => {
      console.log('请求中止！');
    };
  }

  clickGetHeroes() {
    this.configService.getHeroes()
      .subscribe(
        resp => this.heroes = resp.body
      );
  }

  clickPostHero() {
    this.configService.postHero(this.hero)
      .subscribe(
        // resp => this.hero = resp.body
      );
  }

  clickDeleteHero() {
    this.configService.deleteHero(5)
      .subscribe(
        data => console.log(data)
      );
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe(
        (data: Config) => this.config = data
      );
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      .subscribe(
        resp => {
          const keys = resp.headers.keys();
          this.headers = keys.map(key =>
            `${key}: ${resp.headers.get(key)}`);
          this.config = resp.body;
          console.log(resp, this.headers);
        }
      );
  }

  ngOnInit() {
    // this.showConfig();
    // this.showConfigResponse();
    this.hero = {
      id: null,
      name: null
    };
  }

}
