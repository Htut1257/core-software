import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Attendance } from 'src/app/core/models/attendance.model';
import { AttendanceService } from 'src/app/core/services/attendance/attendance.service';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';

import * as moment from 'moment'
@Component({
  selector: 'app-attendance-setup',
  templateUrl: './attendance-setup.component.html',
  styleUrls: ['./attendance-setup.component.css']
})
export class AttendanceSetupComponent implements OnInit {
  employees: Employee[] = []
  attendance: Attendance
  attenId: string = ''
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  todayTime = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  constructor(private route: Router, private attenService: AttendanceService, private employeeService: EmployeeService) {
    this.attendance = {} as Attendance
  }

  attenForm = new FormGroup({
    employee: new FormControl(),
    attenDate: new FormControl(this.todayDate),
    startTime: new FormControl(),
    endTime: new FormControl(),
  })

  ngOnInit(): void {
    this.getEmployee()
    if (this.attenService._atten != undefined) {
      this.attendance = this.attenService._atten
      this.attenId = this.attendance.attendanceId
      this.initilizeAttenForm(this.attendance)
    }
  }

  initilizeAttenForm(atten: Attendance) {
    this.attenForm.setValue({
      employee: atten.employee,
      attenDate: atten.attendanceDate,
      startTime:new Date(atten.startTime),// atten.startTime,
      endTime:new Date(atten.endTime),
    })
  }

  //get employe list
  getEmployee() {
    this.employeeService.getEmployee().subscribe(employees => {
      this.employees = employees
    })
  }

  //add or edit attendance
  onSaveAttendance(data: any) {
    let startDateVariable = moment(data.startTime);
    let startDateValue = startDateVariable.format("yyyy-MM-DD HH:mm:ss");//"yyyy-MM-DD'T'HH:mm:ss"
    let endDateVariable = moment(data.endTime);
    let endDateValue = endDateVariable.format("yyyy-MM-DD HH:mm:ss");
    let Attendance = data
    Attendance.attendanceId = this.attenId
    Attendance.startTime=startDateValue
    Attendance.endTime=endDateValue
    Attendance.macId = 6
    console.log(Attendance)
    this.attenService.saveAttendance(Attendance).subscribe(atten=>{
      console.log('Success')
      console.log(atten)
    })
  }

  //back to Department list
  onBacktoList() {
    this.route.navigate(['/main/attendance']);
  }

  //Clear Data
  onClear() {
    this.attenForm.reset()
    //this.clearLeaveHis(this.leaveHis, this.leaveHisId)
  }

  //compare employee data with initial data
  compareEmployee(e1: Employee, e2: Employee) {
    return e1 && e2 ? e1.employeeId === e2.employeeId : e1 === e2
  }
}
