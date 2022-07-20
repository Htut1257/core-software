import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Payday } from '../../models/payday.model';
import { ApiSetting } from 'src/app/api/app-api-setting';

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
})

@Injectable({
  providedIn: 'root'
})
export class PaydayService {
  _paydays: Payday[] = []
  _payday!: Payday
  constructor(private http: HttpClient) { }

  //get all Payday
  getPayday(): Observable<Payday[]> {
    return new Observable(observable => {
      if (this._paydays.length > 1) {
        observable.next(this._paydays);
        return observable.complete();
      }
      let uri = `${ApiSetting.payRollApi}/setup/get-PayDay`
      let httpOption = { headers: httpHeaders }
      this.http.get<Payday[]>(uri, httpOption).subscribe(paydays => {
        this._paydays = paydays
        observable.next(paydays)
        observable.complete()
      })
    })
  }

  //still have some error on save but edit is ok
  //add or edit  Payday
  savePayday(payday: Payday): Observable<Payday> {
    let uri = `${ApiSetting.payRollApi}/setup/save-PayDay`
    let httpOption = { headers: httpHeaders }
    return this.http.post<Payday>(uri, payday, httpOption);
  }

  //delete payday
  removePayDay(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/setup/delete-PayDay`
    let httpParams = new HttpParams().set('id', id)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.delete<any>(uri, httpOption)
  }
}
