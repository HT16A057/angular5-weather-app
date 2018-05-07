import {Component, OnInit} from '@angular/core';
import {WeatherService} from './weather.service';
import {Subject} from "rxjs/Subject";
import { Weather } from './weather';


@Component({
    selector: 'weather-search',
    templateUrl: './weather-search.component.html',
})
export class WeatherSearchComponent implements OnInit {

    errorMessage: string;
    weatherForecastData: any[];
    disabledForecastButton: boolean = true;
    cityName:string;    // 双方向データバインディング[(ngModel)]

    // WeatherServiceの注入
    constructor(private _weatherService:WeatherService) {
    }

    ngOnInit() {
       
    }

    onSubmit(cityName: string) {
      console.log(cityName);
/*    if (this.cityName == null){*/
        this._weatherService.getWeatherForecast(cityName)
         .subscribe(data => {this.weatherForecastData = data}, 
                    error =>  this.errorMessage = <any>error,            
     );
    }
   //}
    
    
    onSearchLocation(cityName:string) {
     this.disabledForecastButton = false;
     console.log(cityName);
    }

    // 送信ボタンを押したときのイベントハンドラ
    onSubmitDatabinding() {
      
     console.log("inside the two way:"+ this.cityName);
    //  weatherServiceを使ってる
        this._weatherService.getWeatherForecast(this.cityName) // パースされたjsonが返ってきてる
        // このままでは実行されていないから、.subscribe でメンバに返ってきたデータを格納
         .subscribe(data => {this.weatherForecastData = data;}, // ここで英語を日本語にする関数をつくる
                    error =>  this.errorMessage = <any>error,   // サービスの errMsg をメンバに代入            
     );
    //  入力した文字列と送信ボタンをリセットする
      this.onResetControls();

    }

    // input textに入力されるたびに実行される関数
    onSearchLocationWithEvent(event:Event) {
      //console.log("Complete event data value: "+ event);
    //   angularのformの解説の場所に同じふうに書いていた
      console.log("Control value: "+ (<HTMLInputElement>event.target).value);  
    //   入力した内容を双方向データバインディングしている変数に代入
      this.cityName = (<HTMLInputElement>event.target).value;
    //   何か入力されたときにだけボタンをクリックできるようにしている
      this.disabledForecastButton = false;
    }

    onResetControls(){
        this.cityName = '';
        this.disabledForecastButton= true;

    }



}