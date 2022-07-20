import { ApiSetting } from 'src/app/api/app-api-setting';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Roster } from '../../models/roster.model';
import { RosterDetail } from '../../models/roster.model';
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
})
@Injectable({
  providedIn: 'root'
})
export class RosterService {
  _rosters: Roster[] = []
  _roster!: Roster
  _rosterDetail: RosterDetail[] = []
  constructor(private http: HttpClient) { }

  //get all reoster
  getRoster(): Observable<Roster[]> {
    return new Observable(observable => {
      if (this._rosters.length > 1) {
        observable.next(this._rosters)
        return observable.complete()
      }
      let uri = `${ApiSetting.payRollApi}/assign/get-Roster`
      let httpOption = { headers: httpHeaders }
      this.http.get<Roster[]>(uri, httpOption).subscribe(rosters => {
        this._rosters = rosters
        observable.next(rosters)
        observable.complete()
      })
    })
  }

  //get roster detail by roster id
  getRosterDetail(id: string): Observable<RosterDetail[]> {
    return new Observable(observable => {
      // if(this._rosterDetail.length>1){
      //   observable.next(this._rosterDetail)
      //   return observable.complete()
      // }
      let uri = `${ApiSetting.payRollApi}/assign/get-Roster-Detail`
      let httpParams = new HttpParams().set('rosterId', id)
      let httpOption = { headers: httpHeaders, params: httpParams }
      this.http.get<RosterDetail[]>(uri, httpOption).subscribe(rosterDetails => {
        this._rosterDetail = rosterDetails
        observable.next(rosterDetails)
        observable.complete()
      })
    });
  }

  //add or edit roster
  saveRoster(roster: Roster): Observable<Roster> {
    let uri = `${ApiSetting.payRollApi}/assign/save-Roster`
    let httpOption = { headers: httpHeaders }
    return this.http.post<Roster>(uri, roster, httpOption)
  }

  //get employee list for rosKter
  getRosterEmp(): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/assign/get-CurrEmpList`
    let httpOption = { headers: httpHeaders }
    return this.http.get<any>(uri, httpOption)
  }

}
