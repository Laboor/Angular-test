import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Config } from './config';
import { MyHero } from '../my-hero';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(
    private http: HttpClient
  ) { }

  configUrl = 'assets/config.json';
  heroesApi = 'http://localhost:3000/heroes';
  postHeroApi = 'http://localhost:3000/heroes/post';
  deleteHeroApi = 'http://localhost:3000/heroes/delete'

  httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    })
  };

  // GET method
  getHeroes() {
    return this.http.get<MyHero[]>(
      this.heroesApi,
      { observe: 'response' }
    ).pipe(
      retry(3),
      tap(
        data => console.log(data),
        error => console.log(error)
      ),
      catchError(this.handleError)
    );
  }

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  getConfigResponse() {
    return this.http.get<Config>(
      this.configUrl,
      { observe: 'response' }
    );
  }

  // POST method
  postHero(hero: MyHero) {
    return this.http.post<MyHero>(this.postHeroApi, hero, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // DELETE method
  deleteHero(id: number) {
    const url = `${this.heroesApi}/${id}`
    return this.http.delete(this.deleteHeroApi, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // error handle
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
