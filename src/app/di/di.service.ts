import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiService {
  constructor() { }

  user = {
    name: 'John',
    age: '20',
    city: 'beijing'
  };
}
