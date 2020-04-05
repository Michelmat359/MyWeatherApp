import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherLocation } from '../../models/weather-location';
import { WeatherInfoService } from '../../services/weather-info.service';
import { WeatherInfo } from '../../models/weather-info';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  @Input()
  public locations: WeatherLocation;
  public info: WeatherInfo;
  public forecasts: WeatherInfo[];
  

  constructor(
    private weatherInfoService: WeatherInfoService,
    private locationService: Location,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  foreacast(id) {
    console.log('[WeatherInfoComponent] forecast()');
    this,this.weatherInfoService.findForecast(id, 1,2, (err, forecasts)=>{ 
      this.forecasts = forecasts;

    }); 
  }

  
  ngOnInit() {
    console.log('[WeatherCardComponent] ngOnInit()');
    let id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Location ' + id);
    this.foreacast(id);
  }


  
  back() {
    console.log('[SearchLocationComponent] back()');
    this.locationService.back();
  }

}
