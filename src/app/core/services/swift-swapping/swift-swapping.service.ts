import { ApiSetting } from 'src/app/api/app-api-setting';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { ShiftSwappig } from '../../models/shift-swapping.model';
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
})
@Injectable({
  providedIn: 'root'
})
export class SwiftSwappingService {
  _shiftSwapping!:ShiftSwappig
  _shiftsSwapping:ShiftSwappig[]=[]
  constructor(private http:HttpClient) { }

  //get all shift swapping
  getShiftSwapping():Observable<ShiftSwappig[]>{
    return new Observable(observable=>{
      if(this._shiftsSwapping.length>1){
        observable.next(this._shiftsSwapping)
        return observable.complete()
      }
      let uri=`${ApiSetting.payRollApi}/approved/get-ShiftSwapping`
      let httpOption={headers:httpHeaders}
      this.http.get<ShiftSwappig[]>(uri,httpOption).subscribe(shiftsSwap=>{
        this._shiftsSwapping=shiftsSwap
        observable.next(shiftsSwap)
        observable.complete()
      })
    })
  }

  //add or edit swapping
  saveShiftSwap(shiftSwap:ShiftSwappig):Observable<ShiftSwappig>{
    let uri=`${ApiSetting.payRollApi}/approved/save-ShiftSwapping`
    let httpOption={headers:httpHeaders}
    return this.http.post<ShiftSwappig>(uri,shiftSwap,httpOption)
  }


}
