
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Shift } from 'src/app/core/models/shift.model';
import { ShiftService } from 'src/app/core/services/shift/shift.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import * as moment from 'moment'
@Component({
  selector: 'app-shift-setup',
  templateUrl: './shift-setup.component.html',
  styleUrls: ['./shift-setup.component.css']
})
export class ShiftSetupComponent implements OnInit {
  shift: Shift = {
    shiftId: '',
    description: 'test',
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
    startTime: '',
    endTime: '',
    macId: 0
  }
  shiftId: string = ''



  constructor(private shiftService: ShiftService, private route: Router,private toastService:ToastsService,private fb:FormBuilder) { 

  }




  public shiftForm = new FormGroup({
    shiftId: new FormControl(),// country:[{data? data.country:'',disabled:true},Validators.required] 
    description: new FormControl(null, Validators.required),
    startTime: new FormControl(null, [Validators.required]),
    endTime: new FormControl(null, [Validators.required]),
    mon: new FormControl(false),
    tue: new FormControl(false),
    wed: new FormControl(false),
    thu: new FormControl(false),
    fri: new FormControl(false),
    sat: new FormControl(false),
    sun: new FormControl(false),
  })

  ngOnInit(): void {
    if (this.shiftService._shift != undefined) {
      this.shift = this.shiftService._shift
    }
    this.setFormInitialData(this.shift)
  }

  //add or edit Shift
  onSaveShift(data: any) {
    let startDateVariable = moment(data.startTime);
    let startDateValue = startDateVariable.format("yyyy-MM-DD HH:mm:ss");//"yyyy-MM-DD'T'HH:mm:ss"
    let endDateVariable = moment(data.endTime);
    let endDateValue = endDateVariable.format("yyyy-MM-DD HH:mm:ss");

    const Shift = {
      shiftId: data.shiftId,
      description: data.description,
      mon: data.mon,
      tue: data.tue,
      wed: data.wed,
      thu: data.thu,
      fri: data.fri,
      sat: data.sat,
      sun: data.sun,
      startTime: startDateValue,
      endTime: endDateValue,
      macId: 6
    }
    console.log(JSON.stringify(Shift))
    this.shiftService.saveShift(Shift).subscribe(shift => {
      if (this.shiftId == '' || this.shiftId == null) {
        this.shiftService._shifts.push(shift)
        this.toastService.showSuccessToast('','Success adding new Shift')
      }else{
        this.toastService.showSuccessToast('','Success editing Shift')
      }
      this.shiftId = ''
      this.onClear();
      this.shiftService._shift = this.shift
    })
  }

  //back to shift List
  onBacktoList() {
    this.shiftId = ''
    this.onClear();
    this.shiftService._shift = this.shift
    this.route.navigate(['/main/shift'])
  }


  setFormInitialData(shift: Shift) {
    let startDateObj = shift.startTime?new Date(shift.startTime):new Date();
    let endDateObj = shift.endTime?new Date(shift.endTime):new Date();
    // this.shiftForm.setValue({
    //   shiftId: shift.shiftId,
    //   description: shift.description,
    //   mon: shift.mon,
    //   tue: shift.thu,
    //   wed: shift.wed,
    //   thu: shift.thu,
    //   fri: shift.fri,
    //   sat: shift.sat,
    //   sun: shift.sun,
    //   // startTime: null,
    //   // endTime: null,
    //   startTime: startDateObj,
    //   endTime: endDateObj
    // })
  }

  //clear data
  onClear() {
    this.clearShift(this.shift, this.shiftId)
  }

  //clear Shift Object
  clearShift(shift: Shift, id: string) {
    shift = {
      shiftId: id,
      description: 'test',
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      startTime: '',
      endTime: '',
      macId: 0
    }
    this.shift = shift
  }

}
