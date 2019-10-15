import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { filter, map, delay, multicast } from 'rxjs/operators';
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
    // this.myObserverService.getValue().pipe(
    //   map(res => res + 10),
    //   filter(res => res === 11)
    //   ).subscribe(res => console.log(res));
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


    this.multicasted.connect();
  }

  ngOnInit() {
    this.multicasted.subscribe((res) => {
      console.log('A:', res);
    });
    this.multicasted.subscribe((res) => {
      console.log('B:', res);
    });
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
