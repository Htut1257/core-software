import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Job } from '../../models/job.model';
import { ApiSetting } from 'src/app/api/app-api-setting';

const httpHeaders=new HttpHeaders({
  'Content-Type':'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
})

@Injectable({
  providedIn: 'root'
})
export class JobService { 

  constructor(private http:HttpClient) { }
  _jobs:Job[]=[];
  _job!:Job

  //get all Job
  getJob():Observable<Job[]>{
    return new Observable(observable=>{
      if(this._jobs.length>1){
        observable.next(this._jobs);
        return observable.complete();
      }
      let uri=`${ApiSetting.payRollApi}/setup/get-Job`
      let httpOtion={headers:httpHeaders}
      this.http.get<Job[]>(uri,httpOtion).subscribe(jobs=>{
        this._jobs=jobs
        observable.next(jobs)
        observable.complete();
      })
    });
  }

  //add or edit Job
  saveJob(job:Job):Observable<Job>{
    let uri=`${ApiSetting.payRollApi}/setup/save-Job`
    let httpOption={headers:httpHeaders}
    return this.http.post<Job>(uri,job,httpOption);
  }

  //delete Job seem to have some error on Used
  removeJob(id:string):Observable<any>{
    let uri=`${ApiSetting.payRollApi}/setup/delete-Job`
    let httpParams=new HttpParams().set('id',id)
    let httpOption={headers:httpHeaders,Params:httpParams}
    return this.http.delete<any>(uri,httpOption)
  }

}
