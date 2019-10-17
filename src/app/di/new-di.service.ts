import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewDiService {
  constructor() { }

  user = {
    name: 'xp',
    age: '25',
    city: 'guiyang'
  };
}
