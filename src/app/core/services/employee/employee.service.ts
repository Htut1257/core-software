import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Employee } from '../../models/employee.model';
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
export class EmployeeService {
  _employees: Employee[] = []
  _employee!: Employee;
  constructor(private http: HttpClient) { }

  //get all Employee
  getEmployee(): Observable<Employee[]> {
    return new Observable(observable => {
      if (this._employees.length > 1) {
        observable.next(this._employees)
        return observable.complete()
      }
      let uri = `${ApiSetting.payRollApi}/setup/get-Employee`
      console.log(uri)
      let httpOption = { headers: httpHeader }
      this.http.get<Employee[]>(uri, httpOption).subscribe(employees => {
        this._employees = employees
        observable.next(employees)
        observable.complete()
      })
    })
  }

  //add or edit employee
  saveEmployee(employee: Employee): Observable<Employee> {
    console.log(employee)
    let uri = `${ApiSetting.payRollApi}/setup/save-Employee`
    let httpOption = { headers: httpHeader }
    return this.http.post<Employee>(uri, employee, httpOption)
  }

  //delete Employee
  removeEmployee(id: string): Observable<any> {
    let uri = `${ApiSetting.payRollApi}/setup/delete-Employee`
    let httpParams = new HttpParams().set('id', id)
    let httpOption = { headers: httpHeader, params: httpParams }
    return this.http.delete<any>(uri, httpOption)

  }

}
