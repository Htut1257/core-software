import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { BonusHistory } from 'src/app/core/models/bonus_his.model';
import { BonusHistoryService } from 'src/app/core/services/bonus-history/bonus-history.service';
import { Bonus } from 'src/app/core/models/bonus.model';
import { BonusService } from 'src/app/core/services/bonus/bonus.service';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import * as moment from 'moment'
@Component({
  selector: 'app-bonus-his-setup',
  templateUrl: './bonus-his-setup.component.html',
  styleUrls: ['./bonus-his-setup.component.css']
})
export class BonusHisSetupComponent implements OnInit {
  bonusHis: BonusHistory
  bonusHisId: string = ''
  employees: Employee[] = []
  bonuses: Bonus[] = []
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(
    private route: Router, private bonusHisService: BonusHistoryService,
    private bonusService: BonusService, private employeeService: EmployeeService,
    private toastService: ToastsService
  ) {
    this.bonusHis = {} as BonusHistory
  }

  //form validation
  bonusHisForm = new FormGroup({
    bonusHisId: new FormControl({ value: '', disabled: true }),
    bonus: new FormControl(null, Validators.required),
    employee: new FormControl(null, Validators.required),
    bonusDate: new FormControl(this.todayDate, Validators.required),
    amount: new FormControl(0),
    remark: new FormControl('')
  })

  ngOnInit(): void {
    this.getBonus();
    this.getEmployee();
    if (this.bonusHisService._bonusHis != undefined) {
      this.bonusHis = this.bonusHisService._bonusHis
      this.bonusHisId = this.bonusHis.bonusHisId
      this.initializeFormData(this.bonusHis);
    }
  }

  //fill form with data on edit
  initializeFormData(bonusHis: BonusHistory) {
    this.bonusHisForm.setValue({
      bonusHisId: bonusHis.bonusHisId,
      bonus: bonusHis.bonus,
      employee: bonusHis.employee,
      bonusDate: bonusHis.bonusDate,
      amount: bonusHis.amount,
      remark: bonusHis.remark
    })
  }

  //get bonus list
  getBonus() {
    this.bonusService.getBonus().subscribe(bonuses => {
      this.bonuses = bonuses
    })
  }

  //get employee list
  getEmployee() {
    this.employeeService.getEmployee().subscribe(employees => {
      this.employees = employees;
    })
  }

  //add or edit Bonus History
  onSaveBonusHistory(data: any) {
    let bonusDateVariable = moment(this.bonusHis.bonusDate);
    let bonusDateValue = bonusDateVariable.format('YYYY-MM-DD');
    let BonusHistory = data
    BonusHistory.bonusHisId = this.bonusHisId
    BonusHistory.bonusDate = bonusDateValue
    BonusHistory.macId = 6
    this.bonusHisService.saveBonusHistory(BonusHistory).subscribe(bonusHis => {
      if (this.bonusHisId == '') {
        this.bonusHisService._bonus_his.push(bonusHis)
        this.toastService.showSuccessToast('', 'Success assigning new Bonus ')
      } else {
        this.toastService.showSuccessToast('', 'Success editing Bonus assignment')
      }
      this.bonusHisId = ''
      this.onClear();
      this.bonusHisService._bonusHis = undefined
    })
  }

  //back to Department list
  onBacktoList() {
    this.bonusHisId = ''
    this.onClear();
    this.bonusHisService._bonusHis = undefined
    this.route.navigate(['/main/bonus-assign']);
  }

  //Clear Data
  onClear() {
    this.bonusHis = {} as BonusHistory
    this.clearBonusHistory(this.bonusHisId)
  }

  //clear bonu histry object
  clearBonusHistory(id: string) {
    this.bonusHisForm.reset()
    this.reactiveForm.resetForm();
    this.bonusHisForm.controls['bonusHisId'].setValue(id)
    this.bonusHisForm.controls['bonusDate'].setValue(this.todayDate)
    this.bonusHisForm.controls['amount'].setValue(0)
  }

  //compare bonus data with initial data
  compareBonus(b1: Bonus, b2: Bonus) {
    return b1 && b2 ? b1.bonusId === b2.bonusId : b1 === b2
  }

  //compare employee data with initial data
  compareEmployee(e1: Employee, e2: Employee) {
    return e1 && e2 ? e1.employeeId === e2.employeeId : e1 === e2
  }

}
