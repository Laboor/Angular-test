import { Component, OnInit, InjectionToken, Inject, Optional, ViewChild, forwardRef } from '@angular/core';
import { DiService } from './di.service';
import { NewDiService } from './new-di.service';
import { ApiConfigService } from '../api-config.service';
import { ApiConfig } from '../api-config';
import { DiChildComponent } from './di-child/di-child.component';
import { Parent } from './parent';

const API_URL = new InjectionToken<any>('');

@Component({
  selector: 'app-di',
  templateUrl: './di.component.html',
  styleUrls: ['./di.component.css'],
  // useClass：当构造函数中引用DiService时，会新建NewDiService对象，此时DiService为NewDiService的实例，与构造函数中的NewDiService为两个不同的实例;
  // useExisting: DiService是对NewDiService的引用，不会新建NewDiService对象，此时DiService === NewDiService;
  providers: [
    {provide: DiService, useClass: NewDiService},
    {provide: DiService, useExisting: NewDiService},
    {provide: ApiConfigService, useValue: ApiConfig},
    {provide: API_URL, useValue: ApiConfig},
    {provide: Parent, useExisting: forwardRef(() => DIComponent)}
  ]
})
export class DIComponent implements OnInit, Parent {
  @ViewChild(DiChildComponent, {static: true}) diChildComponent;
  constructor(
    private diService: DiService,
    private newDiService: NewDiService,
    private apiConfigService: ApiConfigService,
    @Inject(API_URL) private api: any
  ) {
    this.newDiService.user.name = 'Albert';
    console.log('old:', this.diService.user);
    console.log('new:', this.newDiService.user);
    console.log('old === new? ', this.diService === this.newDiService);
  }
  user: any;
  apiUrl: string;
  componentName = 'DIComponent';

  foo() {
    console.log('父组件调用成功');
  }

  onClick() {
    this.diService.user.name = 'GG';
    this.user = this.diService.user;
    this.apiUrl = this.api.url;
    this.diChildComponent.childFoo();
  }

  ngOnInit() {
    this.user = this.diService.user;
  }
}
