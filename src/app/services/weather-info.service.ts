import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { WeatherLocation } from '../models/weather-location';
import { WeatherInfo } from '../models/weather-info';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt, ArrayType } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})


export class WeatherInfoService {
  private key = 'a953807564ecd91fb21556cdbd76b646';
  private url = `http://api.openweathermap.org/data/2.5/weather`;
  private urlForecast = `http://api.openweathermap.org/data/2.5/forecast`;
  constructor(private http: HttpClient) { }


  findCurrentWeather(location: WeatherLocation,
    cb: (err: Error, info: WeatherInfo) => void): void {
    console.log(`findCurrentWeather(${location.name})`);
    var str = location.id.toString();

    this.http.get<any>(this.url, {
      params: { id: str, appid: this.key, units: 'metric' }
    })

      .subscribe(
        (info) => {
          // console.log('[WeatherInfoService] findCurrentWeather() success.');
          if (info) {

            let res = {
              name: info.name,
              country: info.sys.country,
              ts: Date.now(),
              desc: info.weather[0].description,
              icon: info.weather[0].icon,
              temp: info.main.temp, //main.temp
              temp_max: info.main.temp_max, // main.temp_max
              temp_min: info.main.temp_min, // main.temp_min
              clouds: info.clouds.all, // clouds.all
              humidity: info.main.humidity, // main.humidity
              pressure: info.main.pressure, // main.pressure
              wind: info.wind.speed // wind.speed
            }

            cb(null, res);
          } else {
            console.log('nada');
          }
        },
        (err) => {
          console.log(err);
          cb(err, null);
        }
      );

  }

  findForecast(location: WeatherLocation, ini: number, end: number,
    cb: (err: Error, forecast: WeatherInfo[]) => void): void {
    console.log(`findForecast(${location},${ini},${end})`);
    console.log(location);
    var str = location.toString();

    this.http.get<any>(this.urlForecast, {
      params: { id: str, appid: this.key, units: 'metric' }
    })

      .subscribe(
        (info) => {
          console.log('[WeatherInfoService] findCurrentWeather() success.');
          if (info) {

            var dataPorFechas = new Array();
            var dataArray = new Array();
            var datosAExtraer = info.list;
            var d = new Date();
            let numeroDia = d.getDate();
            //let numeroActual = 0;
            // let cont = 0;
            for (let date of datosAExtraer){
              var splitfecha = date.dt_txt.split(' ');
              var splitDia = splitfecha[0].split('-');
              var mes;
              if(splitDia[1] == '01'){mes = 'Enero';}
              else if (splitDia[1] == '02'){mes = 'Febrero';}
              else if (splitDia[1] == '03'){mes = 'Marzo';}
              else if (splitDia[1] == '04'){mes = 'Abril';}
              else if (splitDia[1] == '05'){mes = 'Mayo';}
              else if (splitDia[1] == '06'){mes = 'Junio';}
              else if (splitDia[1] == '07'){mes = 'Julio';}
              else if (splitDia[1] == '08'){mes = 'Agosto';}
              else if (splitDia[1] == '09'){mes = 'Septiembre';}
              else if (splitDia[1] == '10'){mes = 'Octubre';}
              else if (splitDia[1] == '11'){mes = 'Noviembre';}
              else if (splitDia[1] == '12'){mes = 'Diciembre';}


              var dias=["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Sabado", "Domingo"];
              var fec = splitDia[1]+"/"+splitDia[2]+"/"+splitDia[0];
              var day =new Date(fec).getDay();

              var numerbSplitDia = Number(splitDia[2]);
              var res = [{
                temp: date.main.temp,
                dia: numerbSplitDia,
                hora: splitfecha[1],
                Mes: mes, 
                Anno: splitDia[0],
                DiaSemana: dias[day],
                icon: date.weather[0].icon
              }];
              dataArray.push(res);
              
              
              if (numerbSplitDia != numeroDia){
                dataPorFechas.push(dataArray);
                dataArray = [];
                numeroDia++; 
              }
              
            } 
           console.log(dataPorFechas);
            cb(null, dataPorFechas);
          }

          else {
            console.log('nada');
          }
        },
        (err) => {
          console.log(err);
          cb(err, null);
        });
  }


  findDetalltWeather(location: WeatherLocation,
    cb: (err: Error, info: WeatherInfo) => void): void {
    console.log(`findDetallWeather(${location})`);
    var str = location.toString();

    this.http.get<any>(this.url, {
      params: { id: str, appid: this.key, units: 'metric' }
    })

      .subscribe(
        (info) => {
          
          if (info) {
            console.log('[WeatherInfoService] findDetallWeather() succes.');
            let res = {
              name: info.name,
              country: info.sys.country,
              ts: Date.now(),
              desc: info.weather[0].description,
              icon: info.weather[0].icon,
              temp: info.main.temp, //main.temp
              temp_max: info.main.temp_max, // main.temp_max
              temp_min: info.main.temp_min, // main.temp_min
              clouds: info.clouds.all, // clouds.all
              humidity: info.main.humidity, // main.humidity
              pressure: info.main.pressure, // main.pressure
              wind: info.wind.speed // wind.speed
            }
            cb(null, res);
          } else {
            console.log('nada');
          }
        },
        (err) => {
          console.log(err);
          cb(err, null);
        }
      );

  }


}

