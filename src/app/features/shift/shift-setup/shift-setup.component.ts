
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,NgForm } from '@angular/forms';

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
  shift: Shift 
  shiftId: string = ''
  @ViewChild('reactiveForm',{static:true})reactiveForm:NgForm
  todayTime=moment(new Date(),"yyyy-MM-DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss')
  constructor(private shiftService: ShiftService, private route: Router,private toastService:ToastsService) { 

  }

  public shiftForm = new FormGroup({
    shiftId: new FormControl({value:'',disabled:true}),
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
    console.log(this.todayTime)
    if (this.shiftService._shift != undefined) {
      this.shift = this.shiftService._shift
      this.shiftId=this.shift.shiftId
      this.setFormInitialData(this.shift)
    }
  }

  //fill form data on edit
  setFormInitialData(shift: Shift) {
    let startDateObj = shift.startTime?new Date(shift.startTime):new Date();
    let endDateObj = shift.endTime?new Date(shift.endTime):new Date();
    this.shiftForm.setValue({
      shiftId: shift.shiftId,
      description: shift.description,
      mon: shift.mon,
      tue: shift.thu,
      wed: shift.wed,
      thu: shift.thu,
      fri: shift.fri,
      sat: shift.sat,
      sun: shift.sun,
      // startTime: null,
      // endTime: null,
      startTime: startDateObj,
      endTime: endDateObj
    })
  }

  //add or edit Shift
  onSaveShift(data: any) {
    let startDateVariable = moment(data.startTime);
    let startDateValue = startDateVariable.format("yyyy-MM-DD HH:mm:ss");//"yyyy-MM-DD'T'HH:mm:ss"
    let endDateVariable = moment(data.endTime);
    let endDateValue = endDateVariable.format("yyyy-MM-DD HH:mm:ss");

    const Shift = {
      shiftId: this.shiftId,
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
    
    this.shiftService.saveShift(Shift).subscribe(shift => {
      if (this.shiftId == ''|| this.shiftId == null) {
        this.shiftService._shifts.push(shift)
        this.toastService.showSuccessToast('','Success adding new Shift')
      }else{
        this.toastService.showSuccessToast('','Success editing Shift')
      }
      this.shiftId = ''
      this.onClear();
      this.shiftService._shift = undefined
    })
  }

  //back to shift List
  onBacktoList() {
    this.shiftId = ''
    this.onClear();
    this.shiftService._shift = undefined
    this.route.navigate(['/main/shift'])
  }

  //clear data
  onClear() {
    this.clearShift( this.shiftId)
  }

  //clear Shift Object
  clearShift( id: string) {
    this.shiftForm.reset()
    this.reactiveForm.resetForm()
    this.shiftForm.controls['shiftId'].setValue(id)
    this.shiftForm.controls['startTime'].setValue(null)
    this.shiftForm.controls['endTime'].setValue(null)
  }

}
