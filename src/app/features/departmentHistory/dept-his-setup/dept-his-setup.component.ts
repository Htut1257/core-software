import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department_History } from 'src/app/core/models/dept_his.model';
import { DepartmentHistoryService } from 'src/app/core/services/department-history/department-history.service';
import { Department } from 'src/app/core/models/department.model';
import { DepartmentService } from 'src/app/core/services/department/department.service';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import * as moment from 'moment';
@Component({
  selector: 'app-dept-his-setup',
  templateUrl: './dept-his-setup.component.html',
  styleUrls: ['./dept-his-setup.component.css']
})
export class DeptHisSetupComponent implements OnInit {

  deptHis: Department_History = {
    deptHisId: '',
    startDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
    endDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
    remark: '',
    macId: 0
  }
  deptHisId: string = ''
  departments: Department[] = []
  employees: Employee[] = []
  constructor(
    private route: Router,
    private deptHisService: DepartmentHistoryService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private toastService:ToastsService
  ) { }

  deptHisForm = new FormGroup({
    department: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required),
    startDate: new FormControl(moment(new Date(), 'YYYY-MM-DD'), Validators.required),
    endDate: new FormControl(moment(new Date(), 'YYYY-MM-DD'), Validators.required)
  })

  ngOnInit(): void {
    this.getDepartment()
    this.getEmployee()
    if (this.deptHisService._dept_his != undefined) {
      this.deptHis = this.deptHisService._dept_his
      this.deptHisId = this.deptHis.deptHisId
    }
  }

  //get all department
  getDepartment() {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments
    })
  }

  //get all department
  getEmployee() {
    this.employeeService.getEmployee().subscribe(employees => {
      this.employees = employees
    })
  }

  //add or edit department history
  onSaveDeptHis() {
 
    let startDateVariable = moment(this.deptHis.startDate);
    let startDateValue = startDateVariable.format('yyyy-MM-DD ');
    let endDateVariable = moment(this.deptHis.endDate);
    let endDateValue = endDateVariable.format('yyyy-MM-DD ');

    const DeptHis = {
      deptHisId: this.deptHis.deptHisId,
      department: this.deptHis.department,
      employee: this.deptHis.employee,
      startDate: startDateValue,
      endDate: endDateValue,
      remark: this.deptHis.remark,
      macId: 6
    }
    this.deptHisService.saveDepartHistory(DeptHis).subscribe(deptHis => {
      if (this.deptHisId == '') {
        this.deptHisService._dept_history.push(deptHis)
        this.toastService.showSuccessToast('','Success assigning new Department')
      }else{
        this.toastService.showSuccessToast('','Success editing Department assignment')
      }
      this.deptHisId = ''
      this.onClear()
      this.deptHisService._dept_his = this.deptHis

    })
  }

  //back to Department list
  onBacktoList() {
    this.deptHisId = ''
    this.onClear()
    this.deptHisService._dept_his = this.deptHis
    this.route.navigate(['/main/department-assign']);
  }

  //Clear Data
  onClear() {
    this.clearDeptHitory(this.deptHis, this.deptHisId)
  }

  //clear depatment object
  clearDeptHitory(deptHis: Department_History, id: string) {
    deptHis = {
      deptHisId: id,
      startDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
      endDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
      remark: '',
      macId: 0
    }
    this.deptHis = deptHis
  }

  //compare department data with initial data
  compareDepartment(d1: Department, d2: Department): boolean {
    return d1 && d2 ? d1.deptId === d2.deptId : d1 === d2;
  }

  //compare employee data with initial data
  compareEmployee(e1: Employee, e2: Employee) {
    return e1 && e2 ? e1.employeeId === e2.employeeId : e1 === e2
  }

}
