import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payday } from 'src/app/core/models/payday.model';
import { PaydayService } from 'src/app/core/services/payday/payday.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-payday-setup',
  templateUrl: './payday-setup.component.html',
  styleUrls: ['./payday-setup.component.css']
})
export class PaydaySetupComponent implements OnInit {
  initialPayday: Payday = {
    payDayId: '',
    description: '',
    dayCount: 0,
    macId: 0
  }
  payday: Payday = this.initialPayday
  paydayId: string = ''
  constructor(private route: Router, private paydayService: PaydayService, private toastService: ToastsService) { }

  paydayForm = new FormGroup({
    description: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    if (this.paydayService._payday != undefined) {
      this.payday = this.paydayService._payday;
      this.paydayId = this.payday.payDayId
    }
  }

  //add or edit Payday
  onSavePayday() {
    const Payday = {
      payDayId: this.payday.payDayId,
      description: this.payday.description,
      dayCount: this.payday.dayCount,
      macId: 6
    }
    this.paydayService.savePayday(Payday).subscribe(payday => {
      if (this.paydayId == '') {
        this.paydayService._paydays.push(payday)
        this.toastService.showSuccessToast('','Success adding new payDay')
      }
      else{
        this.toastService.showSuccessToast('','Success editing payDay')
      }
      this.paydayId = ''
      this.onClear()
      this.paydayService._payday = this.payday

    })
  }

  //back to payday list
  onBacktoList() {
    this.paydayId = ''
    this.onClear()
    this.paydayService._payday = this.payday
    this.route.navigate(['/main/payday']);
  }

  //Clear Data
  onClear() {
    this.clearPayDay(this.payday, this.paydayId)
  }

  //
  clearPayDay(payDay: Payday, id: string) {
    payDay = {
      payDayId: id,
      description: '',
      dayCount: 0,
      macId: 0
    }
    this.payday = payDay
  }

}
