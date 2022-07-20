import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
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
  holiday: Holiday
  holidayId: string = ''
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(
    private route: Router, private holidayService: HolidayService,
    private toastService: ToastsService
  ) { }

  //form validatioin
  holidayForm = new FormGroup({
    holidayId: new FormControl({ value: '', disabled: true }),
    description: new FormControl('', Validators.required),
    holidayDate: new FormControl(this.todayDate, Validators.required),
    active: new FormControl(true)
  })

  ngOnInit(): void {
    if (this.holidayService._holiday != undefined) {
      this.holiday = this.holidayService._holiday
      this.holidayId = this.holidayService._holiday.holidayId
      this.initializeFormData(this.holiday)
    }
  }

  //fill form data on edit
  initializeFormData(data: Holiday) {
    this.holidayForm.setValue({
      holidayId: data.holidayId,
      description: data.description,
      holidayDate: data.holidayDate,
      active: data.active
    })
  }

  //add or edit Holiday
  onSaveHoliday(data: any) {

    let momentVariable = moment(data.holidayDate);  //"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    let stringvalue = momentVariable.format('YYYY-MM-DD');
    let Holiday = data
    Holiday.holidayId = this.holidayId
    Holiday.holidayDate = stringvalue
    Holiday.macId = 6
    
    this.holidayService.saveHoliday(Holiday).subscribe(holiday => {
      if (this.holidayId == '') {
        this.holidayService._holidays.push(holiday);
        this.toastService.showSuccessToast('', 'Success adding new Holiday')
      }
      else {
        this.toastService.showSuccessToast('', 'Success editing Holiday')
      }
      this.holidayId = ''
      this.onClear()
      this.holidayService._holiday = undefined
    })
  }

  //back to Department list
  onBacktoList() {
    this.holidayId = ''
    this.onClear()
    this.holidayService._holiday = undefined
    this.route.navigate(['/main/holiday']);
  }

  //Clear Data
  onClear() {
    this.clearHoliday(this.holidayId)
  }

  clearHoliday(id: string) {
    this.holidayForm.reset()
    this.reactiveForm.resetForm()
    this.holidayForm.controls['holidayId'].setValue(id)
    this.holidayForm.controls['holidayDate'].setValue(this.todayDate)
    this.holidayForm.controls['active'].setValue(true)
  }

}
