import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/core/models/job.model';
import { JobService } from 'src/app/core/services/job/job.service';
import { Payday } from 'src/app/core/models/payday.model';
import { PaydayService } from 'src/app/core/services/payday/payday.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-job-setup',
  templateUrl: './job-setup.component.html',
  styleUrls: ['./job-setup.component.css']
})
export class JobSetupComponent implements OnInit {
  job: Job = {
    jobId: '',
    description: '',
    salary: 0,
    active: true,
    macId: 0
  }
  jobId: string = ''
  paydays: Payday[] = []
  constructor(
    private route: Router,
    private jobService: JobService,
    private paydayService: PaydayService,
    private toastService:ToastsService
  ) { }

  jobForm = new FormGroup({
    description: new FormControl('', Validators.required),
    payday: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.getPayday()
    if (this.jobService._job != undefined) {
      this.job = this.jobService._job
      this.jobId = this.jobService._job.jobId
    }
  }

  //get Payday list
  getPayday() {
    this.paydayService.getPayday().subscribe(paydays => {
      this.paydays = paydays
    })
  }

  //add or edit Job
  onSaveJob() {
    const Job = {
      jobId: this.job.jobId,
      description: this.job.description,
      active: this.job.active,
      macId: 6,
      payDay: this.job.payDay,
      salary: this.job.salary
    }
    this.jobService.saveJob(Job).subscribe(job => {
      if (this.jobId == '') {
        this.jobService._jobs.push(job)
        this.toastService.showSuccessToast('','Success adding new Job')
      } else {
        this.toastService.showSuccessToast('','Success editing Job')
      }
      this.jobId = '';
      this.onClear()
      this.jobService._job = this.job
    })
  }

  //back to Department list
  onBacktoList() {
    this.jobId = '';
    this.onClear()
    this.jobService._job = this.job
    this.route.navigate(['/main/job']);
  }

  //Clear Data
  onClear() {
    this.clearJob(this.job, this.jobId)
  }

  //clear Job object
  clearJob(job: Job, id: string) {
    job = {
      jobId: id,
      description: '',
      salary: 0,
      active: true,
      macId: 0
    }
    this.job = job
  }

  //comapre object in select option tag
  compareFn(c1: Payday, c2: Payday): boolean {
    return c1 && c2 ? c1.payDayId === c2.payDayId : c1 === c2;
  }

}
