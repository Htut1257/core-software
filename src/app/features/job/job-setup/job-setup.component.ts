import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/core/models/job.model';
import { JobService } from 'src/app/core/services/job/job.service';
import { Payday } from 'src/app/core/models/payday.model';
import { PaydayService } from 'src/app/core/services/payday/payday.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-job-setup',
  templateUrl: './job-setup.component.html',
  styleUrls: ['./job-setup.component.css']
})
export class JobSetupComponent implements OnInit {
  job: Job
  jobId: string = ''
  paydays: Payday[] = []
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(
    private route: Router,
    private jobService: JobService,
    private paydayService: PaydayService,
    private toastService: ToastsService
  ) { }

  //form validation
  jobForm = new FormGroup({
    jobId: new FormControl({ value: '', disabled: true }),
    description: new FormControl('', Validators.required),
    payday: new FormControl(null, Validators.required),
    salary: new FormControl(0),
    active: new FormControl(true)
  })

  ngOnInit(): void {
    this.getPayday()
    if (this.jobService._job != undefined) {
      this.job = this.jobService._job
      this.jobId = this.jobService._job.jobId
      this.initializeFormData(this.job)
    }
  }

  //fill from data
  initializeFormData(data: Job) {
    this.jobForm.setValue({
      jobId: data.jobId,
      description: data.description,
      payday: data.payDay,
      salary: data.salary,
      active: data.active
    })
  }

  //get Payday list
  getPayday() {
    this.paydayService.getPayday().subscribe(paydays => {
      this.paydays = paydays
    })
  }

  //add or edit Job
  onSaveJob(data: any) {
    let Job = data
    Job.jobId = this.jobId
    Job.macId = 6

    this.jobService.saveJob(Job).subscribe(job => {
      if (this.jobId == '') {
        this.jobService._jobs.push(job)
        this.toastService.showSuccessToast('', 'Success adding new Job')
      } else {
        this.toastService.showSuccessToast('', 'Success editing Job')
      }
      this.jobId = '';
      this.onClear()
      this.jobService._job = undefined
    })
  }

  //back to Department list
  onBacktoList() {
    this.jobId = '';
    this.onClear()
    this.jobService._job = undefined
    this.route.navigate(['/main/job']);
  }

  //Clear Data
  onClear() {
    this.clearJob(this.jobId)
  }

  //clear Job object
  clearJob(id: string) {
    this.jobForm.reset()
    this.reactiveForm.resetForm()
    this.jobForm.controls['jobId'].setValue(id)
    this.jobForm.controls['active'].setValue(true)
  }

  //comapre object in select option tag
  compareFn(c1: Payday, c2: Payday): boolean {
    return c1 && c2 ? c1.payDayId === c2.payDayId : c1 === c2;
  }

}
