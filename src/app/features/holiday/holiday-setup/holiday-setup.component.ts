import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Holiday } from 'src/app/core/models/holiday.model';
import { HolidayService } from 'src/app/core/services/holiday/holiday.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import * as moment from 'moment';

@Component({
  selector: 'app-holiday-setup',
  templateUrl: './holiday-setup.component.html',
  styleUrls: ['./holiday-setup.component.css']
})
export class HolidaySetupComponent implements OnInit {
  holiday: Holiday = {
    holidayId: '',
    description: '',
    holidayDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
    active: true,
    macId: 0
  }
  holidayId: string = ''
  constructor(private route: Router, private holidayService: HolidayService, private toastService: ToastsService) { }

  holidayForm = new FormGroup({
    description: new FormControl('', Validators.required),
    holidayDate: new FormControl(moment(new Date(), 'YYYY-MM-DD'), Validators.required),
  })

  ngOnInit(): void {
    if (this.holidayService._holiday != undefined) {
      this.holiday = this.holidayService._holiday
      this.holidayId = this.holidayService._holiday.holidayId
    }
  }

  //add or edit Holiday
  onSaveHoliday() {
    console.log(this.holiday.holidayDate)
    let momentVariable = moment(this.holiday.holidayDate);  //"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    let stringvalue = momentVariable.format('YYYY-MM-DD');

    const Holiday = {
      holidayId: this.holiday.holidayId,
      description: this.holiday.description,
      holidayDate: stringvalue,
      active: this.holiday.active,
      macId: 6
    }
    this.holidayService.saveHoliday(Holiday).subscribe(holiday => {
      if (this.holidayId == '') {
        this.holidayService._holidays.push(holiday);
        this.toastService.showSuccessToast('','Success adding new Holiday')
      }
      else{
        this.toastService.showSuccessToast('','Success editing Holiday')
      }
      this.holidayId = ''
      this.onClear()
      this.holidayService._holiday = this.holiday
    })
  }

  //back to Department list
  onBacktoList() {
    this.holidayId = ''
    this.onClear()
    this.holidayService._holiday = this.holiday
    this.route.navigate(['/main/holiday']);
  }

  //Clear Data
  onClear() {
    this.clearHoliday(this.holiday,this.holidayId)
  }

  clearHoliday(holiday: Holiday,id:string) {
    holiday = {
      holidayId: id,
      description: '',
      holidayDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
      active: true,
      macId: 0
    }
    this.holiday = holiday
  }

}
