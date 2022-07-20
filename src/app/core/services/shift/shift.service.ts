import { ApiSetting } from 'src/app/api/app-api-setting';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Shift } from '../../models/shift.model';
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
})
@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  _shifts: Shift[] = []
  _shift!: Shift

  constructor(private http: HttpClient) { }

  //get all shift
  getShift(): Observable<Shift[]> {
    return new Observable(observable => {
      if (this._shifts.length > 1) {
        observable.next(this._shifts)
        return observable.complete()
      }
      let uri = `${ApiSetting.payRollApi}/setup/get-Shift`
      let httpOptions = { headers: httpHeaders }
      this.http.get<Shift[]>(uri, httpOptions).subscribe(shifts => {
        this._shifts = shifts
        observable.next(shifts)
        observable.complete()
      })
    })
  }

  //add or edit Shift
  saveShift(shift: Shift): Observable<Shift> {
    let uri = `${ApiSetting.payRollApi}/setup/save-Shift`
    let httpOptions = { headers: httpHeaders }
    return this.http.post<Shift>(uri, shift, httpOptions)
  }

  //delete Shift
  removeShift(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/setup/delete-Shift`
    let httpParams = new HttpParams().set('id', id)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.delete<any>(uri, httpOption)
  }

}
