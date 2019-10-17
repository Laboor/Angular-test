import { Component, OnInit } from '@angular/core';
import { DiService } from './di.service';
import { NewDiService } from './new-di.service';

@Component({
  selector: 'app-di',
  templateUrl: './di.component.html',
  styleUrls: ['./di.component.css'],
  // useClass：当构造函数中引用DiService时，会新建NewDiService对象，此时DiService为NewDiService的实例，与构造函数中的NewDiService为两个不同的实例;
  // useExisting: DiService是对NewDiService的引用，不会新建NewDiService对象，此时DiService === NewDiService;
  providers: [{provide: DiService, useClass: NewDiService}]
})
export class DIComponent implements OnInit {

  constructor(
    private diService: DiService,
    private newDiService: NewDiService,
  ) {
    this.newDiService.user.name = 'Albert';
    console.log('old:', this.diService.user);
    console.log('new:', this.newDiService.user);
    console.log('old === new? ', this.diService === this.newDiService);
  }
  user: any;

  onClick() {
    this.diService.user.name = 'GG';
    this.user = this.diService.user;
  }

  ngOnInit() {
    this.user = this.diService.user;
  }
}
