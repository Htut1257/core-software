import { ApiSetting } from './../../../api/app-api-setting';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JobHistory } from '../../models/job-history.model';
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
})
@Injectable({
  providedIn: 'root'
})
export class JobHistoryService {
  _job_his: JobHistory[] = []
  _jobHis!: JobHistory
  constructor(private http: HttpClient) { }

  //get all job history
  getJobHistory(): Observable<JobHistory[]> {
    return new Observable(observable => {
      if (this._job_his.length > 1) {
        observable.next(this._job_his)
        return observable.complete()
      }
      let uri = `${ApiSetting.payRollApi}/assign/get-JobHis`
      let httpOption = { headers: httpHeaders }
      this.http.get<JobHistory[]>(uri, httpOption).subscribe(jobHis => {
        this._job_his = jobHis
        observable.next(jobHis)
        observable.complete()
      })
    });
  }

  //add or edit Job History
  saveJobHistory(jobHis: JobHistory): Observable<JobHistory> {
    let uri = `${ApiSetting.payRollApi}/assign/save-JobHis`
    let httpOption = { headers: httpHeaders }
    return this.http.post<JobHistory>(uri, jobHis, httpOption)
  }

  //delete job history
  removeJobHistory(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/assign/delete-JobHis`
    let httpParams = new HttpParams().set('id', id)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.delete<any>(uri, httpOption)
  }

}
