import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Attendance } from 'src/app/core/models/attendance.model';
import { AttendanceService } from 'src/app/core/services/attendance/attendance.service';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  employees: Employee[] = []
  attendance: Attendance
  attenId: string = ''
  constructor(private route: Router, private attenService: AttendanceService, private employeeService: EmployeeService) {
    this.attendance = {} as Attendance
  }

  attenForm = new FormGroup({
    employee: new FormControl(),
    attenDate: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
  })

  ngOnInit(): void {
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
      startTime: atten.startTime,
      endTime: atten.endTime,
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
    let Attendance = data
    Attendance.attendanceId = this.attenId
    Attendance.macId = 6
    console.log(Attendance)
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
