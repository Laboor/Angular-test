import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './config';
import { MyHero } from '../my-hero';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(
    private http: HttpClient
  ) { }

  configUrl = 'assets/config.json';
  heroesApi = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  // GET method
  getHeroes() {
    return this.http.get<MyHero[]>(
      this.heroesApi,
      {observe: 'response'}
      );
  }

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  getConfigResponse() {
    return this.http.get<Config>(
      this.configUrl,
      {observe: 'response'}
    );
  }

  // POST method
  postData() {
    // return this.http.post<any>()
  }
}
