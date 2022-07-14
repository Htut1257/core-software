import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deduction } from 'src/app/core/models/deduction.model';
import { DeductionService } from 'src/app/core/services/deduction/deduction.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-deduction-setup',
  templateUrl: './deduction-setup.component.html',
  styleUrls: ['./deduction-setup.component.css']
})
export class DeductionSetupComponent implements OnInit {

  deduction: Deduction = {
    deductionId: '',
    description: '',
    active: true,
    macId: 0
  }
  deductionId: string = ''
  constructor(private route: Router, private deductionService: DeductionService,private toastService:ToastsService) { }

  //for Form Validation
  deductionForm = new FormGroup({
    description: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    if (this.deductionService._deduction != undefined) {
      this.deduction = this.deductionService._deduction
      this.deductionId = this.deduction.deductionId
    }
  }

  //add or edit Deduction
  onSaveDeduction() {
    const Deduction = {
      deductionId: this.deduction.deductionId,
      description: this.deduction.description,
      active: this.deduction.active,
      macId: 6
    }
    this.deductionService.saveDeduction(Deduction).subscribe(deduction => {
      if (this.deductionId == '') {
        this.deductionService._deductions.push(deduction)
        this.toastService.showSuccessToast('title','Success adding new Deduction')
      }
      else{
        this.toastService.showSuccessToast('title','Success editing Deduction')
      }
      this.deductionId = ''
      this.onClear()
      this.deductionService._deduction = this.deduction
      
    })
  }

  //back to Department list
  onBacktoList() {
    this.deductionId = ''
    this.onClear()
    this.deductionService._deduction = this.deduction
    this.route.navigate(['/main/deduction']);
  }

  //Clear Data
  onClear() {
    this.clearDeduction(this.deduction,this.deductionId)
  }

  //clear deduction object
  clearDeduction(deduction:Deduction,id:string){
    deduction={
      deductionId: id,
      description: '',
      active: true,
      macId: 0
    }
    this.deduction=deduction
  }

}
