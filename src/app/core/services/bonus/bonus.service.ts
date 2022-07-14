import { Bonus } from './../../models/bonus.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
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
export class BonusService {
  _bonus!:Bonus
  _bonuses:Bonus[]=[]
  constructor(private http:HttpClient) { 

  }

  //get all bonus data
  getBonus():Observable<Bonus[]>{
    return new Observable(observable=>{
      if(this._bonuses.length>1){
        observable.next(this._bonuses);
        return observable.complete();
      }
      let uri=`${ApiSetting.payRollApi}/setup/get-Bonus`
      let httpOption={headers:httpHeaders}
      this.http.get<Bonus[]>(uri,httpOption).subscribe((bonuses:Bonus[])=>{
        this._bonuses=bonuses
        observable.next(bonuses)
        observable.complete()
      })
    })
  }

  //add or edit Bonus
  saveBonus(bonus:Bonus):Observable<Bonus>{
    let uri=`${ApiSetting.payRollApi}/setup/save-Bonus`
    let httpOption={headers:httpHeaders}
    return this.http.post<Bonus>(uri,bonus,httpOption)
  }

  //delete bonus data
  removeBonus(id:string):Observable<any>{
    let uri=`${ApiSetting.payRollApi}/setup/delete-Bonus`
    let httpParams=new HttpParams().set('id',id);
    let httpOption={headers:httpHeaders,params:httpParams}
    return this.http.delete<any>(uri,httpOption)
  }

}
