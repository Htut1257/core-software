import { JobHistory } from './../../models/job-history.model';
import { ApiSetting } from './../../../api/app-api-setting';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LeaveHistory } from '../../models/leave-history.model';
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
})
@Injectable({
  providedIn: 'root'
})
export class LeaveHistoryService {
  _leave_his: LeaveHistory[] = []
  _leaveHis!: LeaveHistory
  constructor(private http: HttpClient) { }

  //get all leave history
  getLeaveHistory(): Observable<LeaveHistory[]> {
    return new Observable(observable => {
      if (this._leave_his.length > 1) {
        observable.next(this._leave_his)
        return observable.complete()
      }
      let uri = `${ApiSetting.payRollApi}/assign/get-LeaveHis`
      let httpOption = { headers: httpHeaders }
      this.http.get<LeaveHistory[]>(uri, httpOption).subscribe(leaveHis => {
        this._leave_his = leaveHis
        observable.next(leaveHis)
        observable.complete()
      })
    })
  }

  //add or edit leave history
  saveLeaveHistory(leaveHis: LeaveHistory): Observable<LeaveHistory> {
    let uri = `${ApiSetting.payRollApi}/assign/save-LeaveHis`
    let httpOption = { headers: httpHeaders }
    return this.http.post<LeaveHistory>(uri, leaveHis, httpOption)
  }

  //delete leave history
  removeLeaveHis(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/assign/delete-LeaveHis`
    let httpParams = new HttpParams().set('id', id)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.delete<any>(uri, httpOption)
  }

}
