import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ot } from 'src/app/core/models/ot.model';
import { Job } from 'src/app/core/models/job.model';
import { OtService } from 'src/app/core/services/ot/ot.service';
import { JobService } from 'src/app/core/services/job/job.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-ot-setup',
  templateUrl: './ot-setup.component.html',
  styleUrls: ['./ot-setup.component.css']
})
export class OtSetupComponent implements OnInit {
  initialOt: Ot = {
    otId: '',
    description: '',
    otMin: 0,
    amount: 0,
    active: true,
    macId: 0,

  }
  ot: Ot = this.initialOt
  otId: string = ''
  jobs: Job[] = []
  constructor(private route: Router, private otService: OtService, private jobService: JobService, private toastService: ToastsService) { }

  otForm = new FormGroup({
    description: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.getJobs();
    if (this.otService._ot != undefined) {
      this.ot = this.otService._ot
      this.otId = this.ot.otId
    }

  }

  //get Job List
  getJobs() {
    this.jobService.getJob().subscribe(jobs => {
      this.jobs = jobs
    })
  }

  //add or edit Ot
  onSaveOt() {
    const Ot = {
      otId: this.ot.otId,
      description: this.ot.description,
      otMin: this.ot.otMin,
      amount: this.ot.amount,
      active: this.ot.active,
      macId: 6,
      job: this.ot.job
    }
    this.otService.saveOt(Ot).subscribe(ot => {
      if (this.otId == '') {
        this.otService._ots.push(ot);
        this.toastService.showSuccessToast('', 'Success adding new Ot')
      } else {
        this.toastService.showSuccessToast('', 'Success editing Ot')
      }
      this.otId = ''
      this.onClear()
      this.otService._ot = this.ot

    })
  }

  //back to Ot list
  onBacktoList() {
    this.otId = ''
    this.onClear()
    this.otService._ot = this.ot
    this.route.navigate(['/main/ot']);
  }

  //Clear Data
  onClear() {
    this.clearOt(this.ot, this.otId)
  }

  //clear ot object
  clearOt(ot: Ot, id: string) {
    ot = {
      otId: id,
      description: '',
      otMin: 0,
      amount: 0,
      active: true,
      macId: 0,
    }
    this.ot = ot
  }

  //comapre object in select option tag
  compareFn(c1: Job, c2: Job): boolean {
    return c1 && c2 ? c1.jobId === c2.jobId : c1 === c2;
  }

}
