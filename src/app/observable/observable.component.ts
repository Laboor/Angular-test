import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyObserverService } from '../my-observer.service';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {
  constructor(
    private myObserverService: MyObserverService
  ) { }

  ob: Observable<string>;
  value: any;

  myObserver = {
    next: res => console.log(res),
    complete: () => console.log('complete')
  };

  onClick() {
    // this.ob.subscribe((res) => {
    //   this.value = res;
    // });
    // this.myObserverService.getValue().subscribe((res) => console.log(res));
    this.myObserverService.sequence.subscribe(this.myObserver);
    setTimeout(() => {
      this.myObserverService.sequence.subscribe(this.myObserver);
    }, 500);
  }

  ngOnInit() {
    // this.ob = new Observable((observer) => {
    //   setTimeout(() => {
    //     observer.next('Hello World');
    //   }, 2000);
    // });
    // this.ob.subscribe((res) => {
    //   this.value = res;
    // });
  }
}
