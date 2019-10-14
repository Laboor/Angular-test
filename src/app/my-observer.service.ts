import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyObserverService {
  constructor() { }
  sequence = new Observable<number>(this.sequenceSubscriber);
  observable1 = new Observable<number>(this.subscriber1);

  getValue(): Observable<number> {
    return from([1, 2, 3]);
  }

  sequenceSubscriber(observer) {
    const seq = [1, 2, 3];
    let timerId;
    function doSequence(arr, index) {
      timerId = setTimeout(() => {
        observer.next(arr[index]);
        if (index === arr.length - 1) {
          observer.complete();
        } else {
          doSequence(arr, ++index);
        }
      }, 1000);
    }

    doSequence(seq, 0);

    return {unsubscribe() {
      clearTimeout(timerId);
    }};
  }

  subscriber1(observer) {
    observer.next(1);
    observer.next(2);
    setTimeout(() => {
      observer.next(3);
    },2000);

    return { unsubscribe() {} }
  }
}
