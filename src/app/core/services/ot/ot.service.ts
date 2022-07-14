import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Ot } from '../../models/ot.model';
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
export class OtService {
  _ots:Ot[]=[]
  _ot!:Ot;
  constructor(private http:HttpClient) { }

  //get all Ot
  getOt():Observable<Ot[]>{
    return new Observable(observable=>{
      if(this._ots.length>1){
        observable.next(this._ots)
        return observable.complete()
      }
      let uri=`${ApiSetting.payRollApi}/setup/get-Ot`
      let httpOption={headers:httpHeaders}
      this.http.get<Ot[]>(uri,httpOption).subscribe(ots=>{
        this._ots=ots;
        observable.next(ots)
        observable.complete()
      })
    });
  }

  //add or edit Ot
  saveOt(ot:Ot):Observable<Ot>{
    let uri=`${ApiSetting.payRollApi}/setup/save-Ot`
    let httpOption={headers:httpHeaders}
    return this.http.post<Ot>(uri,ot,httpOption)
  }

  //delete ot   
  removeOt(id:string):Observable<any>{
    let uri=`${ApiSetting.payRollApi}/setup/delete-Ot`
    let httpParams=new HttpParams().set('id',id)
    let httpOption={headers:httpHeaders,params:httpParams}
    return this.http.delete<any>(uri,httpOption)
  }
}
