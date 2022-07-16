import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Attendance } from '../../models/attendance.model';
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
export class AttendanceService {
  _atten:Attendance
  _attens:Attendance[]=[]
  constructor(private http:HttpClient) { }

  //add or edit Attendance
  saveAttendance(atten:Attendance):Observable<Attendance>{
    let uri=`${ApiSetting.payRollApi}/approved/save-Attendance`
    let httpOptions={headers:httpHeaders}
    return this.http.post<Attendance>(uri,atten,httpOptions)
  }


}
