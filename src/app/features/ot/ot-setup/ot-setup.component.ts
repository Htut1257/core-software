import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ot } from 'src/app/core/models/ot.model';
import { Job } from 'src/app/core/models/job.model';
import { OtService } from 'src/app/core/services/ot/ot.service';
import { JobService } from 'src/app/core/services/job/job.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-ot-setup',
  templateUrl: './ot-setup.component.html',
  styleUrls: ['./ot-setup.component.css']
})
export class OtSetupComponent implements OnInit {
  ot: Ot
  otId: string = ''
  jobs: Job[] = []
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(private route: Router, private otService: OtService, private jobService: JobService, private toastService: ToastsService) { }

  //form Validation
  otForm = new FormGroup({
    otId: new FormControl({ value: '', disabled: true }),
    description: new FormControl('', Validators.required),
    job: new FormControl(null, Validators.required),
    otMin: new FormControl(0),
    amount: new FormControl(0),
    active: new FormControl(true)
  })

  ngOnInit(): void {
    this.getJobs();
    if (this.otService._ot != undefined) {
      this.ot = this.otService._ot
      this.otId = this.ot.otId
      this.initializeFromData(this.ot)
    }

  }

  //fill form data on edit
  initializeFromData(data: Ot) {
    this.otForm.setValue({
      otId: data.otId,
      description: data.description,
      job: data.job,
      otMin: data.otMin,
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

  //add or edit Ot
  onSaveOt(data: any) {
    let Ot = data
    Ot.otId = this.otId
    Ot.macId = 6

    this.otService.saveOt(Ot).subscribe(ot => {
      if (this.otId == '') {
        this.otService._ots.push(ot);
        this.toastService.showSuccessToast('', 'Success adding new Ot')
      } else {
        this.toastService.showSuccessToast('', 'Success editing Ot')
      }
      this.otId = ''
      this.onClear()
      this.otService._ot = undefined

    })
  }

  //back to Ot list
  onBacktoList() {
    this.otId = ''
    this.onClear()
    this.otService._ot = undefined
    this.route.navigate(['/main/ot']);
  }

  //Clear Data
  onClear() {
    this.clearOt(this.otId)
  }

  //clear ot object
  clearOt(id: string) {
    this.otForm.reset()
    this.reactiveForm.resetForm()
    this.otForm.controls['otId'].setValue(id)
    this.otForm.controls['active'].setValue(true)
  }

  //comapre object in select option tag
  compareFn(c1: Job, c2: Job): boolean {
    return c1 && c2 ? c1.jobId === c2.jobId : c1 === c2;
  }

}
