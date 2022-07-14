import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Department_History } from '../../models/dept_his.model';
import { ApiSetting } from 'src/app/api/app-api-setting';
const httpHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
})
@Injectable({
  providedIn: 'root'
})
export class DepartmentHistoryService {
  _dept_history: Department_History[] = []
  _dept_his!: Department_History
  constructor(private http: HttpClient) {

  }

  //get all department history
  getDepartHistory(): Observable<Department_History[]> {
    return new Observable(observable => {
      if (this._dept_history.length > 1) {
        observable.next(this._dept_history)
        return observable.complete()
      }
      let uri = `${ApiSetting.payRollApi}/assign/get-DeptHis`
      let httpOption = { headers: httpHeader }
      this.http.get<Department_History[]>(uri, httpOption).subscribe(deptHis => {
        this._dept_history = deptHis
        observable.next(deptHis)
        observable.complete()
      })
    })
  }

  //add or edit department History seem to have error
  saveDepartHistory(deptHis: Department_History): Observable<Department_History> {
    let uri = `${ApiSetting.payRollApi}/assign/save-DeptHis`
    let httpOption = { headers: httpHeader }
    return this.http.post<Department_History>(uri, deptHis, httpOption)
  }

  //delete department history
  removeDepartmentHistory(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/assign/delete-DeptHis`
    let httpParams = new HttpParams().set('id', id)
    let httpOption = { headers: httpHeader, params: httpParams }
    return this.http.delete<any>(uri, httpOption)
  }

}
