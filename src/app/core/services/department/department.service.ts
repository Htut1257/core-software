import { Department } from 'src/app/core/models/department.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
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
export class DepartmentService {
  _departments: Department[] = []
  _department!: Department

  constructor(private http: HttpClient) { }

  //get all department data
  getDepartments(): Observable<Department[]> {
    return new Observable(observable => {
      if (this._departments.length > 1) {
        console.log('service')
        observable.next(this._departments);
        return observable.complete()
      }
      let uri = `${ApiSetting.payRollApi}/setup/get-Department`
      let httpOption = { headers: httpHeader }
      this.http.get<Department[]>(uri, httpOption)
        .subscribe((departments: Department[]) => {
          console.log('api')
          this._departments = departments
          observable.next(departments)
          observable.complete()
        })
    })

    // let uri=`${ApiSetting.payRollApi}/setup/get-Department`
    // let httpOption={headers:httpHeader}
    // return this.http.get<Department[]>(uri,httpOption)

  }

  //add or edit Department data
  saveDeparments(department: Department): Observable<Department> {
    let uri = `${ApiSetting.payRollApi}/setup/save-Department`
    let httpOption = { headers: httpHeader }
    return this.http.post<Department>(uri, department, httpOption)
  }

  //delete Department  
  removeDepartment(id:string):Observable<any>{
    let uri=`${ApiSetting.payRollApi}/setup/delete-Department`
    let httpParams=new HttpParams().set('id',id)
    let httpOption={headers:httpHeader,params:httpParams}
    return this.http.delete<any>(uri,httpOption)
  }

}
