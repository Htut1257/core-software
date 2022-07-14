import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = []
  displayedColumns: string[] = ["position", "code", "description", "phoneNo", "email", "address", "gender", "city", "remark", "active", "action"]
  dataSource!: MatTableDataSource<Employee>
  @ViewChild(MatSort, { static: true }) sort!: MatSort
  constructor(private route: Router, private employeeService: EmployeeService,private toastService:ToastsService) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  //get all Employee
  getEmployee() {
    this.employeeService.getEmployee().subscribe(employees => {
      this.employees = employees
      this.dataSource = new MatTableDataSource(employees)
      this.dataSource.sort = this.sort
      this.dataSource.filterPredicate = (data: Employee, filter: string) => {
        return data.description.toLowerCase().includes(filter) //||
          //data.gender.description.toLowerCase().includes(filter) //||
         // data.city.description.toLowerCase().includes(filter)
      }
    })
  }

  //get department data from row & to department setup
  getEmployeeDataRow(employee: Employee) {
    this.route.navigate(['/main/employee-setup']);
    this.employeeService._employee = employee;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete Empoyee
  removeEmployee(emp:Employee){
    this.employeeService.removeEmployee(emp.employeeId).subscribe(data=>{
      if(data.message=="Used")
      {
        this.toastService.showWarningToast('title','the selected is '+emp.description+' Used')
        return
      }
      this.employeeService._employees=this.employeeService._employees.filter(data=>data.employeeId!=emp.employeeId)
      this.getEmployee();
      this.toastService.showSuccessToast('title','Success deleting '+emp.description+' ')
    })
  }

}
