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
  getHeroesApi = 'http://localhost:3000/heroes/api';
  postHeroApi = 'http://localhost:3000/heroes/api';
  deleteHeroApi = 'http://localhost:3000/heroes/api';

  httpHeaders = new HttpHeaders({
  });

  // GET method
  getHeroes() {
    return this.http.get<MyHero[]>(
      this.getHeroesApi,
      {
        headers: this.httpHeaders,
        observe: 'response',
        params: { model: 'hero' }
      }
    ).pipe(
      retry(3),
      catchError(this.handleError),
      tap(
        resp => console.log('GET return: ', resp.body),
        error => console.log(error),
        () => console.log('GET method success')
      )
    );
  }

  // POST method
  postHero(hero: MyHero) {
    return this.http.post<MyHero>(
      this.postHeroApi,
      hero,
      {
        headers: this.httpHeaders,
        observe: 'response',
        params: { model: 'hero' }
      })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap(
          data => console.log('POST return: ', data.body),
          error => console.log(error),
          () => console.log('POST method success')
        )
      );
  }

  // DELETE method
  deleteHero(id: number) {
    const url = `${this.getHeroesApi}/${id}`;
    return this.http.delete(this.deleteHeroApi, { headers: this.httpHeaders, observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  // error handle
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      console.error(error.error);
    }
    return throwError('Something bad happened; please try again later.');
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
}
