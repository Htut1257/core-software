
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { DeductionHistory } from 'src/app/core/models/deduction-history.model';
import { DeductionHistoryService } from 'src/app/core/services/deduction-history/deduction-history.service';
import { Deduction } from './../../../core/models/deduction.model';
import { DeductionService } from 'src/app/core/services/deduction/deduction.service';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import * as moment from 'moment'
@Component({
  selector: 'app-deduction-history-setup',
  templateUrl: './deduction-history-setup.component.html',
  styleUrls: ['./deduction-history-setup.component.css']
})
export class DeductionHistorySetupComponent implements OnInit {

  deductionHis: DeductionHistory
  deductionHisId: string = ''
  deduction: Deduction[] = []
  employee: Employee[] = []
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(private route: Router,
    private deductionHisService: DeductionHistoryService,
    private deductionService: DeductionService,
    private employeeService: EmployeeService,
    private toastService: ToastsService
  ) {
    this.deductionHis = {} as DeductionHistory
  }

  //form validation
  deductionHisForm = new FormGroup({
    deductionHisId: new FormControl({ value: '', disabled: true }),
    deduction: new FormControl(null, Validators.required),
    employee: new FormControl(null, Validators.required),
    amount: new FormControl(0),
    deductionDate: new FormControl(this.todayDate, Validators.required),
    remark: new FormControl('')
  })

  ngOnInit(): void {
    this.getDeduction();
    this.getEmployee();
    if (this.deductionHisService._deductionHis != undefined) {
      this.deductionHis = this.deductionHisService._deductionHis
      this.deductionHisId = this.deductionHis.deductionHisId
      this.initializeFormData(this.deductionHis)
    }
  }

  //fill form data on edit
  initializeFormData(data: DeductionHistory) {
    this.deductionHisForm.setValue({
      deductionHisId: data.deductionHisId,
      deduction: data.deduction,
      employee: data.employee,
      amount: data.amount,
      deductionDate: data.deductionDate,
      remark: data.remark
    })
  }

  //get deduction list
  getDeduction() {
    this.deductionService.getDeduction().subscribe(deductions => {
      this.deduction = deductions
    })
  }

  //get employe list
  getEmployee() {
    this.employeeService.getEmployee().subscribe(employees => {
      this.employee = employees
    })
  }

  //add or edit Deduction history
  onSaveDeductionHistory(data: any) {
    let deductionDateVariable = moment(this.deductionHis.deductionDate);
    let deductionDateValue = deductionDateVariable.format('YYYY-MM-DD');
    let DeductionHistory = data
    DeductionHistory.deductionHisId = this.deductionHisId
    DeductionHistory.deductionDate = deductionDateValue
    DeductionHistory.macId = 6
    this.deductionHisService.saveDeductionHistory(DeductionHistory).subscribe(deductionHis => {
      if (this.deductionHisId == '') {
        this.deductionHisService._deduction_his.push(deductionHis)
        this.toastService.showSuccessToast('', 'Success assigning new Deduction ')
      } else {
        this.toastService.showSuccessToast('', 'Success editing new Deduction assignment')
      }
      this.deductionHisId = ''
      this.onClear();
      this.deductionHisService._deductionHis = undefined
    })
  }

  //back to Department list
  onBacktoList() {
    this.deductionHisId = ''
    this.onClear();
    this.deductionHisService._deductionHis = undefined
    this.route.navigate(['/main/deduction-assign']);
  }

  //Clear Data
  onClear() {
    this.clearDeductionHistory(this.deductionHisId)
  }

  //clear deduction history object
  clearDeductionHistory(id: string) {
    this.deductionHisForm.reset()
    this.reactiveForm.resetForm()
    this.deductionHisForm.controls['deductionHisId'].setValue(id)
    this.deductionHisForm.controls['deductionDate'].setValue(this.todayDate)
    this.deductionHisForm.controls['amount'].setValue(0)
  }

  //compare Leave data with initial data
  compareDeduction(d1: Deduction, d2: Deduction): boolean {
    return d1 && d2 ? d1.deductionId === d2.deductionId : d1 === d2;
  }

  //compare employee data with initial data
  compareEmployee(e1: Employee, e2: Employee) {
    return e1 && e2 ? e1.employeeId === e2.employeeId : e1 === e2
  }

}
