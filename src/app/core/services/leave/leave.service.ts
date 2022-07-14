import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Uleave } from '../../models/uleave.model';
import { ApiSetting } from 'src/app/api/app-api-setting';

const httpHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  _leaves: Uleave[] = []
  _leave!: Uleave;
  constructor(private http: HttpClient) { }

  //get all Leaves
  getLeaves(): Observable<Uleave[]> {
    return new Observable(observable => {
      if (this._leaves.length > 1) {
        observable.next(this._leaves)
        return observable.complete()
      }
      let uri = `${ApiSetting.payRollApi}/setup/get-Leave`
      let httpOption = { headers: httpHeader }
      this.http.get<Uleave[]>(uri, httpOption).subscribe(leaves => {
        this._leaves = leaves;
        observable.next(leaves)
        observable.complete()
      });
    })
  }

  //add or edit Leave
  saveLeave(leave: Uleave): Observable<Uleave> {
    let uri = `${ApiSetting.payRollApi}/setup/save-Leave`
    let httpOption = { headers: httpHeader }
    return this.http.post<Uleave>(uri, leave, httpOption)
  }

  //delete leaves
  removeLeave(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/setup/delete-Leave`
    let httpParams = new HttpParams().set('id', id)
    let httpOption = { headers: httpHeader, params: httpParams }
    return this, this.http.delete<any>(uri, httpOption)
  }

}
