import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
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

  jobHis: JobHistory 
  jobHisId: string = ''
  jobs: Job[] = []
  employees: Employee[] = []
  todayDate=moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  @ViewChild('reactiveForm',{static:true})reactiveForm:NgForm
  constructor(
    private route: Router,
    private jobHisService: JobHistoryService,
    private jobService: JobService,
    private employeeService: EmployeeService,
    private toastService: ToastsService
  ) { }

  jobHisForm = new FormGroup({
    jobHisId:new FormControl({value:'',disabled:true}),
    job: new FormControl(null, Validators.required),
    employee: new FormControl(null, Validators.required),
    startDate: new FormControl(this.todayDate, Validators.required),
    endDate: new FormControl(this.todayDate, Validators.required),
    remark:new FormControl('')
  })

  ngOnInit(): void {
    this.getJob();
    this.getEmployee();
    if (this.jobHisService._jobHis != undefined) {
      this.jobHis = this.jobHisService._jobHis
      this.jobHisId = this.jobHis.jobHisId
    }
  }

  //fill form data on edit
  initializeFormData(data:JobHistory){
    this.jobHisForm.setValue({
      jobHisId:data.jobHisId,
      job:data.job,
      employee:data.employee,
      startDate:data.startDate,
      endDate:data.endDate,
      remark:data.remark
    })
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
  onSaveJobHistory(data:any) {
    let startDateVariable = moment(data.startDate);
    let startDateValue = startDateVariable.format('yyyy-MM-DD ');
    let endDateVariable = moment(data.endDate);
    let endDateValue = endDateVariable.format('yyyy-MM-DD ');
 
    let JobHistory=data
    JobHistory.jobHisId=this.jobHisId
    JobHistory.startDate=startDateValue
    JobHistory.endDate=endDateValue
    JobHistory.macId=6

    this.jobHisService.saveJobHistory(JobHistory).subscribe(jobHis => {
      if (this.jobHisId == '') {
        this.jobHisService._job_his.push(jobHis)
        this.toastService.showSuccessToast('', 'Success assigning new Job')
      } else {
        this.toastService.showSuccessToast('', 'Success editing Job assignment')
      }
      this.jobHisId = ''
      this.onClear();
      this.jobHisService._jobHis =undefined
    })
  }

  //back to job list
  onBacktoList() {
    this.jobHisId = ''
    this.onClear();
    this.jobHisService._jobHis =undefined
    this.route.navigate(['/main/job-assign']);
  }

  //Clear Data
  onClear() {
    this.clearJobHis( this.jobHisId)
  }

  //clear job history object
  clearJobHis( id: string) {
    this.jobHisForm.reset()
    this.reactiveForm.resetForm()
    this.jobHisForm.controls['jobHisId'].setValue(id)
    this.jobHisForm.controls['startDate'].setValue(this.todayDate)
    this.jobHisForm.controls['endDate'].setValue(this.todayDate)
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
