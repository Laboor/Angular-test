import { Injectable } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyObserverService {
  constructor() { }
  sequence = new Observable<number>(this.sequenceSubscriber);
  mySubject = new Subject<number>();

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
}
