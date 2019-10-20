import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { DiService } from './di.service';
import { NewDiService } from './new-di.service';
import { ApiConfigService } from '../api-config.service';
import { ApiConfig } from '../api-config';

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
    {provide: API_URL, useValue: ApiConfig}
  ]
})
export class DIComponent implements OnInit {

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

  onClick() {
    this.diService.user.name = 'GG';
    this.user = this.diService.user;
    this.apiUrl = this.api.url;
  }

  ngOnInit() {
    this.user = this.diService.user;
  }
}
