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

  clickGetHeroes() {
    this.configService.getHeroes()
      .subscribe(
        resp => this.heroes = resp.body,
        error => console.error(error),
        () => console.log('API call success')
      );
  }

  clickPostHero() {
    this.configService.postHero(this.hero)
      .subscribe(
        hero => this.heroes.push(hero)
      );
  }

  clickDeleteHero() {
    this.configService.deleteHero(5)
      .subscribe(
        data => console.log(data)
      )
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

  ngOnInit() {
    // this.showConfig();
    // this.showConfigResponse();
    this.hero = {
      id: null,
      name: null
    };
  }

}
