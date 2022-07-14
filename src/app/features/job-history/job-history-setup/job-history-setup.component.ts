import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobHistory } from 'src/app/core/models/job-history.model';
import { JobHistoryService } from 'src/app/core/services/job-history/job-history.service';
import { Job } from 'src/app/core/models/job.model';
import { JobService } from 'src/app/core/services/job/job.service';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import * as moment from 'moment'
@Component({
  selector: 'app-job-history-setup',
  templateUrl: './job-history-setup.component.html',
  styleUrls: ['./job-history-setup.component.css']
})
export class JobHistorySetupComponent implements OnInit {

  jobHis: JobHistory ={
    jobHisId: '',
    startDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
    endDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
    remark: '',
    macId: 0
  }
  jobHisId: string = ''
  jobs: Job[] = []
  employees: Employee[] = []

  constructor(
    private route: Router,
    private jobHisService: JobHistoryService,
    private jobService: JobService,
    private employeeService: EmployeeService,
    private toastService: ToastsService
  ) { }

  jobHisForm = new FormGroup({
    job: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.getJob();
    this.getEmployee();
    if (this.jobHisService._jobHis != undefined) {
      this.jobHis = this.jobHisService._jobHis
      this.jobHisId = this.jobHis.jobHisId
    }
  }

  //get all Job list
  getJob() {
    this.jobService.getJob().subscribe(jobs => {
      this.jobs = jobs
    })
  }

  //get all employee list
  getEmployee() {
    this.employeeService.getEmployee().subscribe(employees => {
      this.employees = employees
    })
  }

  //add or edit Job History
  onSaveJobHistory() {
    let startDateVariable = moment(this.jobHis.startDate);
    let startDateValue = startDateVariable.format('yyyy-MM-DD ');
    let endDateVariable = moment(this.jobHis.endDate);
    let endDateValue = endDateVariable.format('yyyy-MM-DD ');
    const JobHistory = {
      jobHisId: this.jobHis.jobHisId,
      job: this.jobHis.job,
      employee: this.jobHis.employee,
      startDate: startDateValue,
      endDate: endDateValue,
      remark: this.jobHis.remark,
      macId: 6
    }
    console.log(JSON.stringify(JobHistory))
    this.jobHisService.saveJobHistory(JobHistory).subscribe(jobHis => {
      if (this.jobHisId == '') {
        this.jobHisService._job_his.push(jobHis)
        this.toastService.showSuccessToast('', 'Success assigning new Job')
      } else {
        this.toastService.showSuccessToast('', 'Success editing Job assignment')
      }
      this.jobHisId = ''
      this.onClear();
      this.jobHisService._jobHis = this.jobHis
    })
  }

  //back to job list
  onBacktoList() {
    this.jobHisId = ''
    this.onClear();
    this.jobHisService._jobHis = this.jobHis
    this.route.navigate(['/main/job-assign']);
  }

  //Clear Data
  onClear() {
    this.clearJobHis(this.jobHis, this.jobHisId)
  }

  //clear job history object
  clearJobHis(jobHis: JobHistory, id: string) {
    jobHis = {
      jobHisId: id,
      startDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
      endDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
      remark: '',
      macId: 0
    }
    this.jobHis = jobHis
  }

  //compare department data with initial data
  compareJob(j1: Job, j2: Job): boolean {
    return j1 && j2 ? j1.jobId === j2.jobId : j1 === j2;
  }

  //compare employee data with initial data
  compareEmployee(e1: Employee, e2: Employee) {
    return e1 && e2 ? e1.employeeId === e2.employeeId : e1 === e2
  }

}
