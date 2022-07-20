import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Deduction } from 'src/app/core/models/deduction.model';
import { DeductionService } from 'src/app/core/services/deduction/deduction.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { Validators, FormControl, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-deduction-setup',
  templateUrl: './deduction-setup.component.html',
  styleUrls: ['./deduction-setup.component.css']
})
export class DeductionSetupComponent implements OnInit {

  deduction: Deduction
  deductionId: string = ''
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(
    private route: Router, private deductionService: DeductionService,
    private toastService: ToastsService
  ) { }

  //for Form Validation
  deductionForm = new FormGroup({
    deductionId:new FormControl({value:'',disabled:true}),
    description: new FormControl('', Validators.required),
    active:new FormControl(true)
  })

  ngOnInit(): void {
    if (this.deductionService._deduction != undefined) {
      this.deduction = this.deductionService._deduction
      this.deductionId = this.deduction.deductionId
      this.initializeFormData(this.deduction)
    }
  }

  //fill form data
  initializeFormData(deduction:Deduction){
    this.deductionForm.setValue({
      deductionId:deduction.deductionId,
      description:deduction.description,
      active:deduction.active
    })
  }
  
  //add or edit Deduction
  onSaveDeduction(data:any) {
    let Deduction=data
    Deduction.deductionId=this.deductionId
    Deduction.macId=6
    this.deductionService.saveDeduction(Deduction).subscribe(deduction => {
      if (this.deductionId == '') {
        this.deductionService._deductions.push(deduction)
        this.toastService.showSuccessToast('title', 'Success adding new Deduction')
      }
      else {
        this.toastService.showSuccessToast('title', 'Success editing Deduction')
      }
      this.deductionId = ''
      this.onClear()
      this.deductionService._deduction = undefined

    })
  }

  //back to Department list
  onBacktoList() {
    this.deductionId = ''
    this.onClear()
    this.deductionService._deduction = undefined
    this.route.navigate(['/main/deduction']);
  }

  //Clear Data
  onClear() {
    this.clearDeduction(this.deductionId)
  }

  //clear deduction object
  clearDeduction(id: string) {
  this.deductionForm.reset()
  this.reactiveForm.resetForm()
  this.deductionForm.controls['deductionId'].setValue(id)
  this.deductionForm.controls['active'].setValue(true)
  }

}
