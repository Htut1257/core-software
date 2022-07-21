import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Payday } from 'src/app/core/models/payday.model';
import { PaydayService } from 'src/app/core/services/payday/payday.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { FormGroup, FormControl, Validators,NgForm } from '@angular/forms';
@Component({
  selector: 'app-payday-setup',
  templateUrl: './payday-setup.component.html',
  styleUrls: ['./payday-setup.component.css']
})
export class PaydaySetupComponent implements OnInit {
  payday: Payday
  paydayId: string = ''
  @ViewChild('reactiveForm',{static:true})reactiveForm:NgForm
  constructor(private route: Router, private paydayService: PaydayService, private toastService: ToastsService) { }

  //validation form
  paydayForm = new FormGroup({
    paydayId:new FormControl({value:'',disabled:true}),
    description: new FormControl('', Validators.required),
    dayCount:new FormControl(0)
  })

  ngOnInit(): void {
    if (this.paydayService._payday != undefined) {
      this.payday = this.paydayService._payday;
      this.paydayId = this.payday.payDayId
      this.initializeFormData(this.payday)
    }
  }

  //fill fom data on edit
  initializeFormData(data:Payday){
      this.paydayForm.setValue({
        paydayId:data.payDayId,
        description:data.description,
        dayCount:data.dayCount
      })
  }

  //add or edit Payday
  onSavePayday(data:any) {

    let Payday=data
    Payday.payDayId=this.paydayId
    Payday.macId=6

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
      this.paydayService._payday =undefined

    })
  }

  //back to payday list
  onBacktoList() {
    this.paydayId = ''
    this.onClear()
    this.paydayService._payday = undefined
    this.route.navigate(['/main/payday']);
  }

  //Clear Data
  onClear() {
    this.clearPayDay( this.paydayId)
  }

  //
  clearPayDay( id: string) {
    this.paydayForm.reset()
    this.reactiveForm.resetForm()
    this.paydayForm.controls['paydayId'].setValue(id)
  }

}
