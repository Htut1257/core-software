import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Increment } from 'src/app/core/models/increment.model';
import { IncrementService } from 'src/app/core/services/increment/increment.service';
import { Job } from 'src/app/core/models/job.model';
import { JobService } from 'src/app/core/services/job/job.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-increment-setup',
  templateUrl: './increment-setup.component.html',
  styleUrls: ['./increment-setup.component.css']
})
export class IncrementSetupComponent implements OnInit {

  increment: Increment
  incrementId: string = ''
  jobs: Job[] = []
  @ViewChild('reactiveForm',{static:true})reactivForm:NgForm
  constructor(
    private route: Router,
    private incrementService: IncrementService,
    private jobService: JobService, private toastService: ToastsService
  ) {

  }

  //form validation
  incrementForm = new FormGroup({
    incrementId: new FormControl({ value: '', disabled: true }),
    description: new FormControl(null, Validators.required),
    job: new FormControl(null, Validators.required),
    otMin: new FormControl(0),
    amount: new FormControl(0),
    active: new FormControl(true),
  })

  ngOnInit(): void {
    this.getJobs();
    if (this.incrementService._increment != undefined) {
      this.increment = this.incrementService._increment
      this, this.incrementId = this.increment.incrementId
    }
  }

  //fill form data on edit
  initializeFormData(data: Increment) {
    this.incrementForm.setValue({
      incrementId: data.incrementId,
      description: data.description,
      job: data.job,
      otMin: data.imonth,
      amount: data.amount,
      active: data.active
    })
  }

  //get Job List
  getJobs() {
    this.jobService.getJob().subscribe(jobs => {
      this.jobs = jobs
    })
  }

  //add or edit Increment
  onSaveIncrement(data: any) {

    let Increment = data
    Increment.incrementId = this.incrementId
    Increment.macId = 6
    console.log(Increment)
    this.incrementService.saveIncrement(Increment).subscribe(increment => {
      if (this.incrementId == '') {
        this.incrementService._increments.push(increment)
        this.toastService.showSuccessToast('', 'Success adding new Increment')
      }
      else {
        this.toastService.showSuccessToast('', 'Success editing Increment')
      }
      this.incrementId = ''
      this.onClear()
      this.incrementService._increment = undefined

    })
  }

  //back to Ot list
  onBacktoList() {
    this.incrementId = ''
    this.onClear()
    this.incrementService._increment =undefined
    this.route.navigate(['/main/increment']);
  }

  //Clear Data
  onClear() {
    this.clearIncrement(this.incrementId)
  }

  //clear increment object
  clearIncrement(id: string) {
    this.incrementForm.reset();
    this.reactivForm.resetForm();
    this.incrementForm.controls['incrementId'].setValue(id)
    this.incrementForm.controls['active'].setValue(true)
  }

  //comapre object in select option tag
  compareFn(c1: Job, c2: Job): boolean {
    return c1 && c2 ? c1.jobId === c2.jobId : c1 === c2;
  }

}
