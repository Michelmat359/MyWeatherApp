import { Injectable } from '@angular/core';
import { WeatherLocation } from '../models/weather-location';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherLocationService {
  private key = '';
  private url = `http://api.openweathermap.org/data/2.5/weather`;
  constructor(private http: HttpClient) { }
  
  findLocation(desc: string,
    cb: (err: Error, locations: WeatherLocation[]) => void): void {
    console.log(`[WeatherLocationService] findLocation(${desc}`);
    this.http.get<any>(this.url, {
      params: { APPID: this.key, q: desc }
    })
      .subscribe(
        (info) => {
          console.log('[WeatherLocationService] findLocation() success.');
          if (info) {
            cb(null, [{
              id: info.id,
              lat: info.coord.lat,
              lon: info.coord.lon,
              name: info.name,
              country: info.sys.country
            }]);
          } else {
            cb(null, []);
          }
        },
        (err) => {
          console.log(err);
          cb(err, null);
        }
      );
  }
}
