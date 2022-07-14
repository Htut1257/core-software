import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Holiday } from '../../models/holiday.model';
import { ApiSetting } from 'src/app/api/app-api-setting';
const httpHeaders=new HttpHeaders({
  'Content-Type':'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  _holidays:Holiday[]=[]
  _holiday!:Holiday

  constructor(private http:HttpClient) { }

  //get all holiday
  getHoliday():Observable<Holiday[]>{
    return new Observable(observable=>{
      if(this._holidays.length>1){
        observable.next(this._holidays)
        return observable.complete()
      }
      let uri=`${ApiSetting.payRollApi}/setup/get-Holiday`
      let httpOptions={headers:httpHeaders}
      this.http.get<Holiday[]>(uri,httpOptions).subscribe(holidays=>{
        this._holidays=holidays
        observable.next(holidays)
        observable.complete()
      })
    });
  }  

  //add or edit holiday  
  saveHoliday(holiday:Holiday):Observable<Holiday>{
    let uri=`${ApiSetting.payRollApi}/setup/save-Holiday`
    let httpOptions={headers:httpHeaders}
    return this.http.post<Holiday>(uri,holiday,httpOptions)
  }

  //delete holiday
  removeHoliday(id:string):Observable<any>{
    let uri=`${ApiSetting.payRollApi}/setup/delete-Holiday`
    let httpParams=new HttpParams().set('id',id)
    let httpOption={headers:httpHeaders,params:httpParams}
    return this.http.delete<any>(uri,httpOption)
  }

}
