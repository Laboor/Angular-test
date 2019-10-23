import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { Config } from './config';
import { MyHero } from '../my-hero';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.css']
})
export class HttpClientComponent implements OnInit {

  constructor(
    private configService: ConfigService
  ) { }

  config: Config;
  headers: any;
  heroes: MyHero[];
  hero: MyHero;

  showHeroes() {
    this.configService.getHeroes()
      .subscribe(
        resp => this.heroes = resp.body,
        error => console.error(error),
        () => console.log('API call success')
      );
  }

  showPostHero() {
    this.configService.addHero(this.hero)
      .subscribe(
        hero => this.heroes.push(hero)
      );
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe(
        (data: Config) => this.config = data
      );
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      .subscribe(
        resp => {
          const keys = resp.headers.keys();
          this.headers = keys.map(key =>
            `${key}: ${resp.headers.get(key)}`);
          this.config = resp.body;
          console.log(resp, this.headers);
        }
      );
  }

  getHeroes() {
    this.showHeroes();
  }

  postHero() {
    this.showPostHero();
    // fetch('http://localhost:3000/heroes/post', {
    //   method: 'POST'
    // }).then(res => console.log(res));

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://localhost:3000/heroes/post');
    // xhr.send();
  }

  ngOnInit() {
    // this.showConfig();
    this.showConfigResponse();
    this.hero = {
      id: null,
      name: null
    };
  }

}
