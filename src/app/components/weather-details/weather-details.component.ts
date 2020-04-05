import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherLocation } from '../../models/weather-location';
import { WeatherInfoService } from '../../services/weather-info.service';
import { WeatherInfo } from '../../models/weather-info';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  @Input()
  public location: WeatherLocation;
  public infod: WeatherInfo;
  public info: WeatherInfo;
  

  constructor(
    private weatherInfoService: WeatherInfoService,
    private locationService: Location,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  details(id) {
    console.log('[WeatherDetailsComponent] details()');
    this.weatherInfoService.findDetalltWeather(id, (err, infod) => {
      this.infod = infod;
      let name = infod.name;
      console.log(infod);
    });
  }

  refresh(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Location ' + id);
    this.router.navigateByUrl(`/details/${id}`);
    
}

  ngOnInit(): void {
    console.log('[WeatherDetailsComponent] ngOnInit()');
    let id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Location ' + id);
    this.details(id);
  }


  back() {
    console.log('[ReturnComponent] back()');
    this.locationService.back();
  }

}
