import { Injectable } from '@angular/core';
import { City } from '../../models/city.model';
import { ApiSetting } from 'src/app/api/app-api-setting';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});

@Injectable({
  providedIn: 'root'
})
export class CityService {
  _cities: City[] = []
  _city!: City
  constructor(private http: HttpClient) { }

  //get all City data
  getCity(): Observable<City[]> {
    return new Observable(observable => {
      if (this._cities.length > 1) {
        observable.next(this._cities);
        return observable.complete();

      }
      let uri = `${ApiSetting.payRollApi}/setup/get-City`
      let httpOption = { headers: httpHeader }
      this.http.get<City[]>(uri, httpOption).subscribe((cities: City[]) => {
        this._cities = cities;
        observable.next(cities)
        observable.complete()
      });
    })
  }

  //add or edit City
  saveCity(city: City): Observable<City> {
    let uri = `${ApiSetting.payRollApi}/setup/save-City`
    let httpOption = { headers: httpHeader }
    return this.http.post<City>(uri, city, httpOption)
  }

  //delete city
  removeCity(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/setup/delete-City`
    let httpParams=new HttpParams().set('id',id)
    let httpOption={headers:httpHeader,params:httpParams}
    return this.http.delete<any>(uri,httpOption)
  }

}
