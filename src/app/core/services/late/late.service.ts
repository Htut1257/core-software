import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Late } from '../../models/late.model';
import { ApiSetting } from 'src/app/api/app-api-setting';

const httpHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});

@Injectable({
  providedIn: 'root'
})
export class LateService {
  _lates: Late[] = []
  _late!: Late;
  constructor(private http: HttpClient) { }

  //gat all Late
  getLate(): Observable<Late[]> {
    return new Observable(observable => {
      if (this._lates.length > 1) {
        observable.next(this._lates)
        return observable.complete()
      }
      let uri = `${ApiSetting.payRollApi}/setup/get-Late`
      let httpOption = { headers: httpHeader }
      this.http.get<Late[]>(uri, httpOption).subscribe(lates => {
        this._lates = lates
        observable.next(lates)
        observable.complete()
      })
    })
  }

  //add or edit Late
  saveLate(late: Late): Observable<Late> {
    let uri = `${ApiSetting.payRollApi}/setup/save-Late`
    let httpOption = { headers: httpHeader }
    return this.http.post<Late>(uri, late, httpOption)
  }

  //delete late seem to have error
  removeLate(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/setup/delete-late`
    let httpParams = new HttpParams().set('id', id)
    let httpOption = { headers: httpHeader, params: httpParams }
    return this.http.delete<any>(uri, httpOption)
  }

}
