import { Injectable, Inject } from '@angular/core';
import { WEATHER_LIST } from './weather.data';
  // XMLHttpRequestなるもの
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { environment } from '../../environments/environment';

//const APPID = '45f4dd45e0f724512ba044c5a2caf4bc';

@Injectable()
export class WeatherService {
  
  //private baseUrl='http://api.openweathermap.org/data/2.5/';

  //constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: Http) { }
  
  // リロードしてすぐに表示されてる
  // Httpをメンバにしている
  constructor(private http: Http) { 
     console.log('Production='+ environment.production);

  }

  // 日本とかの国名と気温と天候のweather型の配列を返してる
  getWeatherItems(){
    	return WEATHER_LIST;
  } 

  // いわゆるテスト用
  getWeatheritemsbyCity(cityName): Observable<any>{

    	 return this.http.get(
         environment.baseUrl +
         'weather?q='+ cityName +
         '&appid='+ environment.appId +
         '&units=' + environment.units
         )
    	 .map(response => response.json())
    	 .catch(this.handleError);
  }

  // WeatherSerchComponentでばりばり使われている
  // 実際にこのコードがプログラム中で使われている
  getWeatherForecast(cityName): Observable<any[]>{
    // ちょうどXMLHttpRequestを要求している。
     return this.http.get(environment.baseUrl +'forecast?q='+ cityName +'&appid='+ environment.appId +'&units=' + environment.units)
     .map(response => this.extractData(response)) // extractData関数により、戻り地は理想のJSON
     .catch(this.handleError);  // エラー処理
  }

  private extractData(res: any) {
    // Http.get()だとjsonでそのまま扱えないらしいので下のようにするらしい
    let body = res.json();
    // console.log(body); // これを見ないと中身がわからないので見てみると、理想のもどちりより上の階層にlistがあった。
    return body.list || { };  // 短絡回路
  }

  // エラーハンドラー
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    // if (error instanceof Response) {
    //   const body = error.json() || '';
    //   const err = body.error || JSON.stringify(body);
    //   errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    // } else {
      // 引数のオブジェクトに .messageがあるならそれを、なければ無理やり文字列に変えてる
      errMsg = error.message ? error.message : error.toString();
    //}
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}