import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { LeaveOpening } from '../../models/leave-opening.model';
import { ApiSetting } from 'src/app/api/app-api-setting';
const httpHeaders=new HttpHeaders({
  'Content-type':'application/json',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Headers':'Content-Type',
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS'
})
@Injectable({
  providedIn: 'root'
})
export class LeaveOpeningService {
  _leavesOpening:LeaveOpening[]=[];
  _leaveOpening!:LeaveOpening;
  constructor( private http:HttpClient) { }

  //get all leave opening
  getLeaveOpening():Observable<LeaveOpening[]>{
    return new Observable(observable=>{
      if(this._leavesOpening.length>1){
        observable.next(this._leavesOpening)
        return observable.complete()
      }
      let uri=`${ApiSetting.payRollApi}/approved/get-LeaveOpening`
      let httpOption={headers:httpHeaders}
      this.http.get<LeaveOpening[]>(uri,httpOption).subscribe(leavesOpening=>{
        this._leavesOpening=leavesOpening  
        observable.next(leavesOpening)
        observable.complete()
      })
    })
  }

  getLeaveOpeningDataRow(){

  }

  

  //add or edit leave opening
  saveLeaveOpening(leaveOpening:LeaveOpening):Observable<LeaveOpening>{
    let uri=`${ApiSetting.payRollApi}/approved/save-LeaveOpening`
    let httpOption={headers:httpHeaders}
    return this.http.post<LeaveOpening>(uri,leaveOpening,httpOption)
  }

}
