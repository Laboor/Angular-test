import { Component, OnInit, Optional, forwardRef } from '@angular/core';
import { DIComponent } from '../di.component';
import { Parent } from '../parent';

@Component({
  selector: 'app-di-child',
  templateUrl: './di-child.component.html',
  styleUrls: ['./di-child.component.css'],
  providers: [{
    provide: Parent,
    useExisting: forwardRef(() => DiChildComponent)
  }]
})
export class DiChildComponent implements OnInit {

  constructor(
    @Optional() private parent: Parent
  ) { }

  onClick() {
    console.log(this.parent.componentName);
  }

  childFoo() {
    console.log('子组件调用成功');
  }

  ngOnInit() {
  }

}
