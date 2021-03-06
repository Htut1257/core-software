import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveOpening } from 'src/app/core/models/leave-opening.model';
import { LeaveOpeningService } from 'src/app/core/services/leave-opening/leave-opening.service';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { Uleave } from 'src/app/core/models/uleave.model';
import { LeaveService } from 'src/app/core/services/leave/leave.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import * as moment from 'moment'
@Component({
  selector: 'app-leave-opening-setup',
  templateUrl: './leave-opening-setup.component.html',
  styleUrls: ['./leave-opening-setup.component.css']
})
export class LeaveOpeningSetupComponent implements OnInit {

  leaveOpening!: LeaveOpening
  leaveOpeningId: string = ''
  employees: Employee[] = []
  leaves: Uleave[] = []
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(
    private route: Router, private leaveOpeningService: LeaveOpeningService,
    private employeeService: EmployeeService, private leaveService: LeaveService,
    private toastService:ToastsService
  ) {
    this.leaveOpening = {} as LeaveOpening
  }

  leaveOpeningForm = new FormGroup({
    leaveOpenId: new FormControl({ value: '', disabled: true }),
    employee: new FormControl(null, Validators.required),
    leave: new FormControl(null, Validators.required),
    dayCount: new FormControl(0),
    openingDate: new FormControl(this.todayDate, Validators.required),
  })

  ngOnInit(): void {
    this.getEmployee();
    this.getLeave();
    if (this.leaveOpeningService._leaveOpening != undefined) {
      this.leaveOpening = this.leaveOpeningService._leaveOpening
      this.leaveOpeningId = this.leaveOpening.leaveOpeningId
      this.initializaFormData(this.leaveOpening)
    }
  }

  //get Leave List
  getLeave() {
    this.leaveService.getLeaves().subscribe(leaves => {
      this.leaves = leaves
    })
  }

  //get employe list
  getEmployee() {
    this.employeeService.getEmployee().subscribe(employees => {
      this.employees = employees
    })
  }

  //fill data with Leve Opening on edit
  initializaFormData(leave: LeaveOpening) {
    this.leaveOpeningForm.setValue({
      leaveOpenId: leave.leaveOpeningId,
      employee: leave.employee,
      leave: leave.leave,
      dayCount: leave.dayCount,
      openingDate: leave.openingDate,
    })
  }

  //add or edit 
  onSaveLeaveOpening(data: any) {
    let openingDate = moment(data.openingDate);  //"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    let openingValue = openingDate.format('yyyy-MM-DD ');
    let LeaveOpening = data;
    LeaveOpening.leaveOpeningId = this.leaveOpeningId
    LeaveOpening.openingDate = openingValue
    LeaveOpening.macId = 6
    this.leaveOpeningService.saveLeaveOpening(LeaveOpening).subscribe(leaveOpening => {
        if(this.leaveOpeningId=''){
          this.leaveOpeningService._leavesOpening.push(leaveOpening)
          this.toastService.showSuccessToast('','Success assigning new Leave Opening')
        } 
        else{
          this.toastService.showSuccessToast('','Success editing Leave Opening')  
        }
        this.leaveOpeningId=''
        this.onClear();
        this.leaveOpeningService._leaveOpening=undefined
    })
  }

  //back to Department lists
  onBacktoList() {
    this.leaveOpeningId=''
    this.onClear();
    this.leaveOpeningService._leaveOpening=undefined
    this.route.navigate(['/main/leave-opening']);
  }

  //Clear Data
  onClear() {
    this.clearLeaveOpening(this.leaveOpeningId)
    //this.clearLeaveHis(this.leaveHis, this.leaveHisId)
  }

  clearLeaveOpening(id: string) {
    this.leaveOpeningForm.reset()
    this.reactiveForm.resetForm()
    this.leaveOpeningForm.controls['leaveOpenId'].setValue(id)
    this.leaveOpeningForm.controls['openingDate'].setValue(this.todayDate)
  }

  //compare Leave data with initial data
  compareLeave(l1: Uleave, l2: Uleave): boolean {
    return l1 && l2 ? l1.leaveId === l2.leaveId : l1 === l2;
  }

  //compare employee data with initial data
  compareEmployee(e1: Employee, e2: Employee) {
    return e1 && e2 ? e1.employeeId === e2.employeeId : e1 === e2
  }

}
