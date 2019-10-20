import { Component, OnInit, Optional, Host } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { filter, map, delay, multicast } from 'rxjs/operators';
import { MyObserverService } from '../my-observer.service';
import { DiService } from '../di/di.service';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css'],
  // providers: [DiService]
})
export class ObservableComponent implements OnInit {
  constructor(
    @Host()
    private myObserverService: MyObserverService,
    @Optional()
    private diService: DiService
  ) { }

  ob: Observable<string>;
  value: any;
  user: any;

  multicasted = this.myObserverService.getValue().pipe(
    multicast(this.myObserverService.mySubject)
  );

  myObserver = {
    next: res => console.log(res),
    complete: () => console.log('complete')
  };

  onClick() {
    // this.ob.subscribe((res) => {
    //   this.value = res;
    // });
    this.myObserverService.getValue().pipe(
      map(res => res + 10),
      filter(res => res === 11)
      ).subscribe(res => console.log(res));
    // this.myObserverService.getValue().pipe(
    //   map(res => this.value = res),
    //   multicast(this.myObserverService.mySubject)
    // ).subscribe(this.myObserver);
    // setTimeout(() => {
    //   this.myObserverService.sequence.subscribe(this.myObserver);
    // }, 500);
    // this.myObserverService.mySubject.next(100);
    // this.myObserverService.mySubject.complete = () => {
    //   console.log('Subject complete');
    // };

    // this.myObserverService.getValue().subscribe(this.myObserverService.mySubject);
  }


  ngOnInit() {
    // this.user = this.diService.user;
    // this.myObserverService.mySubject.subscribe((res) => {
    //   console.log(res);
    // });
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
