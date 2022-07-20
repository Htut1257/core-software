import { ApiSetting } from 'src/app/api/app-api-setting';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Deduction } from '../../models/deduction.model';

const httpHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});

@Injectable({
  providedIn: 'root'
})
export class DeductionService {
  _deductions: Deduction[] = []
  _deduction!: Deduction
  constructor(private http: HttpClient) { }

  // get all Deduction
  getDeduction(): Observable<Deduction[]> {
    return new Observable(observable => {
      if (this._deductions.length > 1) {
        observable.next(this._deductions)
        return observable.complete()
      }
      let uri = `${ApiSetting.payRollApi}/setup/get-Deduction`
      let httpOption = { headers: httpHeader }
      this.http.get<Deduction[]>(uri, httpOption).subscribe(deductions => {
        this._deductions = deductions
        observable.next(deductions)
        observable.complete()
      })
    });
  }

  // add or edit Deduction
  saveDeduction(deduction: Deduction): Observable<Deduction> {
    let uri = `${ApiSetting.payRollApi}/setup/save-Deduction`
    let httpOption = { headers: httpHeader }
    return this.http.post<Deduction>(uri, deduction, httpOption)
  }

  //delete deduction
  removeDeduction(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/setup/delete-Deduction`
    let httpParams = new HttpParams().set('id', id)
    let httpOption = { headers: httpHeader, params: httpParams }
    return this.http.delete<any>(uri, httpOption)
  }

}
