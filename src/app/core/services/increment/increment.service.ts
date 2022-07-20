import { ApiSetting } from 'src/app/api/app-api-setting';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Increment } from '../../models/increment.model';

const httpHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});

@Injectable({
  providedIn: 'root'
})
export class IncrementService {
  _increments: Increment[] = []
  _increment!: Increment;
  constructor(private http: HttpClient) { }

  //get all Increment
  getincrement(): Observable<Increment[]> {
    return new Observable(observable => {
      if (this._increments.length > 1) {
        observable.next(this._increments)
        return observable.complete()
      }
      let uri = `${ApiSetting.payRollApi}/setup/get-Increment`
      let httpOption = { headers: httpHeader }
      this.http.get<Increment[]>(uri, httpOption).subscribe(increments => {
        this._increments = increments
        observable.next(increments)
        observable.complete()
      })
    })
  }

  //add or edit Increment 
  saveIncrement(increment: Increment): Observable<Increment> {
    let uri = `${ApiSetting.payRollApi}/setup/save-Increment`
    let httpOption = { headers: httpHeader }
    return this.http.post<Increment>(uri, increment, httpOption)
  }

  //delete Increment
  removeIncrement(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/setup/delete-Increment`
    let httpParams = new HttpParams().set('id', id)
    let httpOption = { headers: httpHeader, params: httpParams }
    return this.http.delete<any>(uri, httpOption)
  }

}
