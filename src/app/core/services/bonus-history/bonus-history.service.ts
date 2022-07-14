import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BonusHistory } from '../../models/bonus_his.model';
import { ApiSetting } from 'src/app/api/app-api-setting';
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
})

@Injectable({
  providedIn: 'root'
})
export class BonusHistoryService {
  _bonus_his: BonusHistory[] = []
  _bonusHis!: BonusHistory
  constructor(private http: HttpClient) { }

  //get all Bonus History
  getBonusHistory(): Observable<BonusHistory[]> {
    return new Observable(observable => {
      if (this._bonus_his.length > 1) {
        observable.next(this._bonus_his)
        return observable.complete();
      }
      let uri = `${ApiSetting.payRollApi}/assign/get-BonusHis`
      let httpOption = { headers: httpHeaders }
      this.http.get<BonusHistory[]>(uri, httpOption).subscribe(bonus_his => {
        this._bonus_his = bonus_his
        observable.next(bonus_his)
        observable.complete()
      })
    });
  }

  //add or edit bonus History
  saveBonusHistory(bonusHis: BonusHistory): Observable<BonusHistory> {
    let uri = `${ApiSetting.payRollApi}/assign/save-BonusHis`
    let httpOption = { headers: httpHeaders }
    return this.http.post<BonusHistory>(uri, bonusHis, httpOption)
  }

  //delete bonsu history
  removeBonusHistory(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/assign/delete-BonusHis`
    let httpParams = new HttpParams().set('id', id)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.delete<any>(uri, httpOption)
  }


}
