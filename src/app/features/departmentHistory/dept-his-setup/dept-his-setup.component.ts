import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
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

  deptHis: Department_History
  deptHisId: string = ''
  departments: Department[] = []
  employees: Employee[] = []
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(
    private route: Router,
    private deptHisService: DepartmentHistoryService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private toastService: ToastsService
  ) { }

  deptHisForm = new FormGroup({
    departHisId: new FormControl({ value: '', disabled: true }),
    remark: new FormControl(''),
    department: new FormControl(null, Validators.required),
    employee: new FormControl(null, Validators.required),
    startDate: new FormControl(this.todayDate, Validators.required),
    endDate: new FormControl(this.todayDate, Validators.required)
  })

  ngOnInit(): void {
    this.getDepartment()
    this.getEmployee()
    if (this.deptHisService._dept_his != undefined) {
      this.deptHis = this.deptHisService._dept_his
      this.deptHisId = this.deptHis.deptHisId
      this.initializeFormData(this.deptHis)
    }
  }

  //fill form data on edit
  initializeFormData(data: Department_History) {
    this.deptHisForm.setValue({
      departHisId: data.deptHisId,
      remark: data.remark,
      department: data.department,
      employee: data.employee,
      startDate: data.startDate,
      endDate: data.endDate
    })
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
  onSaveDeptHis(data: any) {

    let startDateVariable = moment(data.startDate);
    let startDateValue = startDateVariable.format('yyyy-MM-DD ');
    let endDateVariable = moment(data.endDate);
    let endDateValue = endDateVariable.format('yyyy-MM-DD ');

    let DeptHis = data
    DeptHis.deptHisId = this.deptHisId
    DeptHis.startDate = startDateValue
    DeptHis.endDate = endDateValue
    DeptHis.macId = 6
    this.deptHisService.saveDepartHistory(DeptHis).subscribe(deptHis => {
      if (this.deptHisId == '') {
        this.deptHisService._dept_history.push(deptHis)
        this.toastService.showSuccessToast('', 'Success assigning new Department')
      } else {
        this.toastService.showSuccessToast('', 'Success editing Department assignment')
      }
      this.deptHisId = ''
      this.onClear()
      this.deptHisService._dept_his = undefined

    })
  }

  //back to Department list
  onBacktoList() {
    this.deptHisId = ''
    this.onClear()
    this.deptHisService._dept_his = undefined
    this.route.navigate(['/main/department-assign']);
  }

  //Clear Data
  onClear() {
    this.clearDeptHitory(this.deptHisId)
  }

  //clear depatment object
  clearDeptHitory( id: string) {
    this.deptHisForm.reset()
    this.reactiveForm.resetForm()
    this.deptHisForm.controls['departHisId'].setValue(id)
    this.deptHisForm.controls['startDate'].setValue(this.todayDate)
    this.deptHisForm.controls['endDate'].setValue(this.todayDate)
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
