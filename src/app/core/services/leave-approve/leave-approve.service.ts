import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { LeaveApproved } from '../../models/leave_approved.model';
import { ApiSetting } from 'src/app/api/app-api-setting';
const httpHeaders=new HttpHeaders({
  'Content-Type':'application/json',
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Headers':'Content-Type',
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS'
})
@Injectable({
  providedIn: 'root'
})
export class LeaveApproveService {
  leaveApprove:LeaveApproved[]=[]
  constructor(private http:HttpClient) { }

  //get leave approved list
  getLeaveApproved():Observable<LeaveApproved[]>{
    return new Observable(observable=>{
      if(this.getLeaveApproved.length>1){
        observable.next(this.leaveApprove)
        return observable.complete()
      }
      let uri=`${ApiSetting.payRollApi}/approved/get-LeaveApproved`
      let httpOption={headers:httpHeaders}
      this.http.get<LeaveApproved[]>(uri,httpOption).subscribe(leavesApprove=>{
        this.leaveApprove=leavesApprove
        observable.next(leavesApprove)
        observable.complete()
      })
    })
  }

  saveLeaveApproved(leave:LeaveApproved):Observable<LeaveApproved>{
    let uri=`${ApiSetting.payRollApi}/approved/save-LeaveApproved`
    let httpOption={headers:httpHeaders}
    return this.http.post<LeaveApproved>(uri,leave,httpOption)
  }

}
