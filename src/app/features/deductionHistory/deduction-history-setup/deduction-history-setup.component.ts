
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  deductionHis: DeductionHistory ={
    deductionHisId: '',
    deductionDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
    remark: '',
    amount: 0,
    macId: 0
  }
  deductionHisId: string = ''
  deduction: Deduction[] = []
  employee: Employee[] = []

  constructor(private route: Router,
    private deductionHisService: DeductionHistoryService,
    private deductionService: DeductionService,
    private employeeService: EmployeeService,
    private toastService:ToastsService
    ) { }

  deductionHisForm = new FormGroup({
    deduction: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required),
    deductionDate: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.getDeduction();
    this.getEmployee();
    if (this.deductionHisService._deductionHis != undefined) {
      this.deductionHis = this.deductionHisService._deductionHis
      this.deductionHisId = this.deductionHis.deductionHisId
    }
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
  onSaveDeductionHistory() {
    let deductionDateVariable = moment(this.deductionHis.deductionDate);
    let deductionDateValue = deductionDateVariable.format('YYYY-MM-DD');
    const DeductionHistory = {
      deductionHisId: this.deductionHis.deductionHisId,
      deduction: this.deductionHis.deduction,
      employee: this.deductionHis.employee,
      deductionDate: deductionDateValue,
      remark: this.deductionHis.remark,
      amount: this.deductionHis.amount,
      macId: 6
    }
    this.deductionHisService.saveDeductionHistory(DeductionHistory).subscribe(deductionHis => {
      if (this.deductionHisId == '') {
        this.deductionHisService._deduction_his.push(deductionHis)
        this.toastService.showSuccessToast('','Success assigning new Deduction ')
      }else{
        this.toastService.showSuccessToast('','Success editing new Deduction assignment')
      }
      this.deductionHisId = ''
      this.onClear();
      this.deductionHisService._deductionHis = this.deductionHis
    })
  }

  //back to Department list
  onBacktoList() {
    this.deductionHisId = ''
    this.onClear();
    this.deductionHisService._deductionHis = this.deductionHis
    this.route.navigate(['/main/deduction-assign']);
  }

  //Clear Data
  onClear() {
   this.clearDeductionHistory(this.deductionHis,this.deductionHisId)
  }

  //clear deduction history object
  clearDeductionHistory(deductionHis: DeductionHistory, id: string) {
    deductionHis = {
      deductionHisId:id,
      deductionDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
      remark: '',
      amount: 0,
      macId: 0
    }
    this.deductionHis=deductionHis
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
