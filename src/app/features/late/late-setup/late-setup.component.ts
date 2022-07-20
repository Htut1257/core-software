import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Late } from 'src/app/core/models/late.model';
import { LateService } from 'src/app/core/services/late/late.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-late-setup',
  templateUrl: './late-setup.component.html',
  styleUrls: ['./late-setup.component.css']
})
export class LateSetupComponent implements OnInit {
  late: Late
  lateId: string = ''
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(private route: Router, private lateService: LateService, private toastService: ToastsService) { }

  lateForm = new FormGroup({
    lateId: new FormControl({ value: '', disabled: true }),
    description: new FormControl('', Validators.required),
    lateMin: new FormControl(0),
    amount:new FormControl(0),
    active:new FormControl(true)
  })

  ngOnInit(): void {
    if (this.lateService._late != undefined) {
      this.late = this.lateService._late
      this.lateId = this.late.lateId
      this.initializeFromData(this.late)
    }
  }


  //fill form data on edit
  initializeFromData(data: Late) {
    this.lateForm.setValue({
      lateId: data.lateId,
      description: data.description,
      lateMin: data.lateMin,
      amount:data.amount,
      active: data.active
    })
  }

  //add or edit Late
  onSaveLate(data: any) {

    let late=data
    late.lateId=this.lateId
    late.macId=6

    this.lateService.saveLate(late).subscribe(late => {
      if (this.lateId == '') {
        this.lateService._lates.push(late)
        this.toastService.showSuccessToast('', 'Success adding new Late')
      } else {
        this.toastService.showSuccessToast('', 'Success editing Late')
      }
      this.lateId = ''
      this.onClear()
      this.lateService._late = undefined

    })
  }

  //back to Department list
  onBacktoList() {
    this.lateId = ''
    this.onClear()
    this.lateService._late = undefined
    this.route.navigate(['/main/late']);
  }

  //Clear Data
  onClear() {
    this.clearLate( this.lateId)
  }

  //clear Lae Object
  clearLate( id: string) {
   this.lateForm.reset()
   this.reactiveForm.resetForm()
   this.lateForm.controls['lateId'].setValue(id)
   this.lateForm.controls['active'].setValue(true)
  }

}
