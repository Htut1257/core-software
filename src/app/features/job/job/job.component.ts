import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from 'src/app/core/models/job.model';
import { JobService } from 'src/app/core/services/job/job.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})

export class JobComponent implements OnInit {
  jobs!: Job[]
  displayedColumns: string[] = ["position", "code", "description", "payday", "salary", "active", "action"]
  dataSource!: MatTableDataSource<Job>
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private route: Router, private jobService: JobService, private toasatService: ToastsService) {

  }

  ngOnInit(): void {
    this.getJob();
  }

  //get all job
  getJob() {
    this.jobService.getJob().subscribe(jobs => {
      this.jobs = jobs
      console.log(jobs)
      this.dataSource = new MatTableDataSource(this.jobs)
      this.dataSource.sort = this.sort
      this.dataSource.filterPredicate = (data: Job, filter: string) => {
        return data.description.toLocaleLowerCase().includes(filter) ||
          data.jobId.toLocaleLowerCase().includes(filter) //||
          // data.salary==parseInt(filter) ||
        //  data.payDay.description.toLocaleLowerCase().includes(filter);
      }
    })
  }

  //get job data from row & to job setup
  getJobDataRow(job: Job) {
    this.route.navigate(['/main/job-setup']);
    this.jobService._job = job;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete Job
  removeJob(job: Job) {
    this.jobService.removeJob(job.jobId).subscribe(data => {
      if (data.message == "Used") {
        this.toasatService.showWarningToast('', 'the selected ' + job.description + ' is Used')
        return
      }
      this.jobService._jobs = this.jobService._jobs.filter(data => data.jobId != job.jobId)
      this.getJob()
      this.toasatService.showWarningToast('', 'Success deleting ' + job.description + '')
    })
  }

}
