import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LeaveHistory } from 'src/app/core/models/leave-history.model';
import { LeaveHistoryService } from 'src/app/core/services/leave-history/leave-history.service';
import { Uleave } from 'src/app/core/models/uleave.model';
import { LeaveService } from 'src/app/core/services/leave/leave.service';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import * as moment from 'moment'
@Component({
  selector: 'app-leave-history-setup',
  templateUrl: './leave-history-setup.component.html',
  styleUrls: ['./leave-history-setup.component.css']
})
export class LeaveHistorySetupComponent implements OnInit {

  leaveHis: LeaveHistory ={
    leaveHisId: '',
    startDate:  moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
    endDate:  moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
    remark: '',
    macId: 0
  }
  leaveHisId: string = ''
  leaves: Uleave[] = []
  employees: Employee[] = []
  constructor(
    private route: Router,
    private leaveHisService: LeaveHistoryService,
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private toastService: ToastsService
  ) { }

  leaveHisForm = new FormGroup({
    leave: new FormControl(null, Validators.required),
    employee: new FormControl(null, Validators.required),
    startDate: new FormControl( moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'), Validators.required),
    endDate: new FormControl( moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'), Validators.required),
  })

  ngOnInit(): void {
    this.getLeave();
    this.getEmployee();
    if (this.leaveHisService._leaveHis != undefined) {
      this.leaveHis = this.leaveHisService._leaveHis
      this.leaveHisId = this.leaveHis.leaveHisId
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

  //add or edit Leave History 
  onSaveLeaveHistory() {
    let startDateVariable = moment(this.leaveHis.startDate);
    let startDateValue = startDateVariable.format('YYYY-MM-DD');
    let endDateVariable = moment(this.leaveHis.endDate);
    let endDateValue = endDateVariable.format('YYYY-MM-DD');
    const LeaveHistory = {
      leaveHisId: this.leaveHis.leaveHisId,
      leave: this.leaveHis.leave,
      employee: this.leaveHis.employee,
      startDate: startDateValue,
      endDate: endDateValue,
      remark: this.leaveHis.remark,
      macId: 6
    }
    this.leaveHisService.saveLeaveHistory(LeaveHistory).subscribe(leaveHis => {
      if (this.leaveHisId == '') {
        this.leaveHisService._leave_his.push(leaveHis)
        this.toastService.showSuccessToast('','Success assigning new Leave')
      }else{
        this.toastService.showSuccessToast('','Success editing Leave assignment')  
      }
      this.leaveHisId = ''
      this.onClear();
      this.leaveHisService._leaveHis = this.leaveHis

    })
  }

  //back to Department list
  onBacktoList() {
    this.leaveHisId = ''
    this.onClear();
    this.leaveHisService._leaveHis = this.leaveHis
    this.route.navigate(['/main/leave-assign']);
  }

  //Clear Data
  onClear() {
    this.leaveHisForm.reset()
    this.clearLeaveHis(this.leaveHis, this.leaveHisId)
  }

  //clear Leave history object
  clearLeaveHis(leaveHis: LeaveHistory, id: string) {
    leaveHis = {
      leaveHisId: id,
      startDate:  moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
      endDate:  moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
      remark: '',
      macId: 0
    }
    this.leaveHis = leaveHis
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
