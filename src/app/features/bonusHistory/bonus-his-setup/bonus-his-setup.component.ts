import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  initialBonusHis: BonusHistory = {
    bonusHisId: '',
    bonusDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
    remark: '',
    amount: 0,
    macId: 0,
  }
  bonusHis: BonusHistory = this.initialBonusHis
  bonusHisId: string = ''
  employees: Employee[] = []
  bonuses: Bonus[] = []

  constructor(
    private route: Router, private bonusHisService: BonusHistoryService,
    private bonusService: BonusService, private employeeService: EmployeeService,
    private toastService: ToastsService
  ) { }

  bonusHisForm = new FormGroup({
    bonus: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required),
    bonusDate: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.getBonus();
    this.getEmployee();
    if (this.bonusHisService._bonusHis != undefined) {
      this.bonusHis = this.bonusHisService._bonusHis
      this.bonusHisId = this.bonusHis.bonusHisId
    }
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
  onSaveBonusHistory() {
    let bonusDateVariable = moment(this.bonusHis.bonusDate);
    let bonusDateValue = bonusDateVariable.format('YYYY-MM-DD');
    const BonusHistory = {
      bonusHisId: this.bonusHis.bonusHisId,
      bonus: this.bonusHis.bonus,
      employee: this.bonusHis.employee,
      bonusDate: bonusDateValue,
      remark: this.bonusHis.remark,
      amount: this.bonusHis.amount,
      macId: 6,
    }
    this.bonusHisService.saveBonusHistory(BonusHistory).subscribe(bonusHis => {
      if (this.bonusHisId == '') {
        this.bonusHisService._bonus_his.push(bonusHis)
        this.toastService.showSuccessToast('','Success assigning new Bonus ')
      }else{
        this.toastService.showSuccessToast('','Success editing Bonus assignment')
      }
      this.bonusHisId = ''
      this.onClear();
      this.bonusHisService._bonusHis =this.bonusHis
    })
  }

  //back to Department list
  onBacktoList() {
    this.bonusHisId = ''
    this.onClear();
    this.bonusHisService._bonusHis = this.bonusHis
    this.route.navigate(['/main/bonus-assign']);
  }

  //Clear Data
  onClear() {
    this.clearBonusHistory(this.bonusHis,this.bonusHisId)
  }

  //clear bonu histry object
  clearBonusHistory(bonusHis: BonusHistory, id: string) {
    bonusHis = {
      bonusHisId: '',
      bonusDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
      remark: '',
      amount: 0,
      macId: 0,
    }
    this.bonusHis = bonusHis
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
