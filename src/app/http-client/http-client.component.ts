import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { Config } from './config';

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
    this.showConfigResponse();
  }

}
