import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { JobHistory } from 'src/app/core/models/job-history.model';
import { JobHistoryService } from 'src/app/core/services/job-history/job-history.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.css']
})
export class JobHistoryComponent implements OnInit {
  jobHis: JobHistory[] = []
  displayedColumns: string[] = ["position","code", "job", "employee", "startDate", "endDate", "remark","action"]
  dataSource!: MatTableDataSource<JobHistory>
  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor(private route: Router, private jobHisService: JobHistoryService,private toastService:ToastsService) { }

  ngOnInit(): void {
    this.getJobHistory();
  }

  //get all job history
  getJobHistory() {
    this.jobHisService.getJobHistory().subscribe(jobHis => {
      this.dataSource = new MatTableDataSource(jobHis)
      this.dataSource.sort = this.sort
      this.dataSource.filterPredicate = (data: JobHistory, filter: string) => {
        //return data.employee.description.toLowerCase().includes(filter) ||
         // data.job.description.toLowerCase().includes(filter) ||
         // data.employee.description.toLowerCase().includes(filter) ||
          return data.startDate.toLowerCase().includes(filter) ||
          data.endDate.toLowerCase().includes(filter)
      }
    })
  }

  //get job history data from row & to job history setup
  getJobHisDataRow(jobHis: JobHistory) {
    this.route.navigate(['/main/job-assign-setup']);
    this.jobHisService._jobHis = jobHis;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete  job history
  removeJobHistory(jobHis:JobHistory){
    this.jobHisService.removeJobHistory(jobHis.jobHisId).subscribe(data=>{
      if(data.message=="Used"){
        this.toastService.showWarningToast('','the selected is '+jobHis.jobHisId+' Used')
        return
      }
      this.jobHisService._job_his=  this.jobHisService._job_his.filter(data=>data.jobHisId!=jobHis.jobHisId)
      this.getJobHistory()
      this.toastService.showSuccessToast('','Success deleting '+jobHis.jobHisId+'')
    })
  }

}
