import { ApiSetting } from './../../../api/app-api-setting';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { DeductionHistory } from '../../models/deduction-history.model';
const httpHeaders=new HttpHeaders({
  'Content-Type':'application/json',
  'Allow-Control-Access-Origin':'*',
  'Allow-Control-Access-Headers':'Content-Type',
  'Allow-Control-Access-Methods':'GET,PUT,POST,DELETE.OPTIONS'
})
@Injectable({
  providedIn: 'root'
})
export class DeductionHistoryService {
  _deduction_his:DeductionHistory[]=[]
  _deductionHis!:DeductionHistory
  constructor(private http:HttpClient) { }

  //get deduction history
  getDeductionHistory():Observable<DeductionHistory[]>{
    return new Observable(observable=>{
      if(this._deduction_his.length>1){
        observable.next(this._deduction_his)
        return observable.complete()
      }
      let uri=`${ApiSetting.payRollApi}/assign/get-DeductionHis`
      let httpOption={headers:httpHeaders}
      this.http.get<DeductionHistory[]>(uri,httpOption).subscribe(deductionHis=>{
        this._deduction_his=deductionHis
        observable.next(deductionHis)
        observable.complete()
      })
    });
  }

  //add or edit deduction history
  saveDeductionHistory(deductionHis:DeductionHistory):Observable<DeductionHistory>{
    let uri=`${ApiSetting.payRollApi}/assign/save-DeductionHis`
    let httpOption={headers:httpHeaders}
    return this.http.post<DeductionHistory>(uri,deductionHis,httpOption)
  }

  //delete Deduction History
  removeDeductionHistory(id:string):Observable<any>{
    let uri=`${ApiSetting.payRollApi}/assign/delete-DeductionHis`
    let httpparams=new HttpParams().set('id',id)
    let httpOption={header:httpHeaders,params:httpparams}
    return this.http.delete<any>(uri,httpOption)
  }

}
 