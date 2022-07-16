import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShiftSwappig } from 'src/app/core/models/shift-swapping.model';
import { SwiftSwappingService } from 'src/app/core/services/swift-swapping/swift-swapping.service';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import * as moment from 'moment'
@Component({
  selector: 'app-shift-swapping-setup',
  templateUrl: './shift-swapping-setup.component.html',
  styleUrls: ['./shift-swapping-setup.component.css']
})
export class ShiftSwappingSetupComponent implements OnInit {
  shiftSwap!: ShiftSwappig
  shiftSwapId:string=''
  employees:Employee[]=[]
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  constructor(
    private route: Router, private shiftSwapService: SwiftSwappingService,
    private employeeService: EmployeeService
  ) { }

  shiftSwapForm = new FormGroup({
    fromEmp: new FormControl(''),
    toEmp: new FormControl(''),
    fromDate: new FormControl(this.todayDate),
    toDate: new FormControl(this.todayDate),
    remark: new FormControl('')
  })

  ngOnInit(): void {
    this.getEmployee()
  }

   //get employe list
   getEmployee() {
    this.employeeService.getEmployee().subscribe(employees => {
      this.employees = employees
    })
  }

  //initialize data with shift swap form
  initializeShiftSwap(shiftSwap:ShiftSwappig){
    this.shiftSwapForm.setValue({
      fromEmp: shiftSwap.fromEmployeeId,
      toEmp: shiftSwap.toEmployeeId,
      fromDate:shiftSwap.fromDate,
      toDate:shiftSwap.toDate,
      remark: shiftSwap.remark
      
    })
  }

  onSaveShiftSwap(data:any) {
    let ShiftSwap=data
    let fromDate = moment(data.fromDate);  
    let fromDateValue = fromDate.format('yyyy-MM-DD ');//fromEmployee and toEmployee
    let toDate = moment(data.fromDate);  //"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    let toDateValue = toDate.format('yyyy-MM-DD ');
    ShiftSwap.fromDate=fromDateValue
    ShiftSwap.toDate=toDateValue
    ShiftSwap.userId='006',
    ShiftSwap.macId=6
    console.log(ShiftSwap)
    console.log(JSON.stringify(ShiftSwap))
    this.shiftSwapService.saveShiftSwap(ShiftSwap).subscribe(shiftSwap=>{
      console.log("Success")
      console.log(shiftSwap)
      this.onClear()
    })
  }

  //back to Department list
  onBacktoList() {
    this.route.navigate(['/main/shift-swapping']);
  }

  //Clear Data
  onClear() {
    this.shiftSwapForm.reset()
    //this.clearLeaveHis(this.leaveHis, this.leaveHisId)
  }

  //compare employee data with initial data
  compareEmployee(e1: Employee, e2: Employee) {
    return e1 && e2 ? e1.employeeId === e2.employeeId : e1 === e2
  }


}
