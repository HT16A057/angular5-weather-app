import { Component, OnInit, Input} from '@angular/core';
import { Weather } from './weather';
//import { WEATHER_LIST } from './weather.data';
import { WeatherService } from './weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'weather-list',
  //template: `<weather-item *ngFor="let weather of weathers" [item]="weather"></>`,
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css'],
  providers: [WeatherService]
})
export class WeatherListComponent implements OnInit {
  //@Input('city') cityName: String;
  // WeatherSearchComponent のweatherForecastDataプロパティをこことバイドさせてる！！！！！
  // したがって、このクラスの weathers にはパースされたJSONが入ってるはず
  // @Input('')の中身の引数は次にバインディングに関連させるときの名前！これを目印的な感じで使う
  @Input('WeatherForecastList') weathers: any;
  errorMessage: string;
 // weathers: any[];

//  WeatherService と Router を注入
  constructor(private _weatherService: WeatherService,
              private router: Router){
    //console.log(city);
  }

  ngOnInit():any {

  	//this.weathers = WEATHER_LIST;
    //this.weathers = this._weatherService.getWeatherItems();
    //console.log(cityName);

    // this._weatherService.getWeatherForecast('Amritsar')
    //      .subscribe(data => {this.weathers = data}, 
    //                 error =>  this.errorMessage = <any>error
    //  );
    }

    gotoDetailpage(id: number): any {
      this.router.navigate(['/detail-page', id]);
    }

}
