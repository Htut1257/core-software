import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Department_History } from 'src/app/core/models/dept_his.model';
import { DepartmentHistoryService } from 'src/app/core/services/department-history/department-history.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-dept-his',
  templateUrl: './dept-his.component.html',
  styleUrls: ['./dept-his.component.css']
})
export class DeptHisComponent implements OnInit {

  deptHistory:Department_History[]=[]
  displayedColumns:string[]=["position","code","department","employee","startDate","endDate","remark","action"]
  dataSource!:MatTableDataSource<Department_History>
  @ViewChild(MatSort,{static:true}) sort!:MatSort
  constructor(private deptHisService:DepartmentHistoryService,private route:Router,private toastService:ToastsService) { }

  ngOnInit(): void {
    this.getDepartmentHistory()
  }


  //get all department history 
  getDepartmentHistory(){
    this.deptHisService.getDepartHistory().subscribe(deptHistory=>{
      console.log(deptHistory)
      this.deptHistory=deptHistory
      this.dataSource=new MatTableDataSource(deptHistory)
      this.dataSource.sort=this.sort
      this.dataSource.filterPredicate=(data:Department_History,filter:string)=>{
        // return data.department.description.toLowerCase().includes(filter) ||
        //   data.employee.description.toLowerCase().includes(filter) ||
         return  data.startDate.toLowerCase().includes(filter) ||
          data.endDate.toLowerCase().includes(filter) ||
          data.remark.toLowerCase().includes(filter)
      }
    })
  }

  //get department history data from row & to department history setup
  getDeptHisDataRow(deptHis:Department_History){
    this.route.navigate(['/main/department-assign-setup']);
    this.deptHisService._dept_his=deptHis;
  }
 
  //apply filter to table
  applyFilter(event:any){
    let filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

  //delete Department History
  removeDepartmentHistory(deptHis:Department_History){
    this.deptHisService.removeDepartmentHistory(deptHis.deptHisId).subscribe(data=>{
      if(data.message=="Used")
      {
        this.toastService.showWarningToast('','the selected '+deptHis.deptHisId+' is Used')
        return
      }
      this.deptHisService._dept_history= this.deptHisService._dept_history.filter(data=>data.deptHisId!=deptHis.deptHisId)
      this.getDepartmentHistory()
      this.toastService.showSuccessToast('','Success deleting '+deptHis.deptHisId+'')
    })
  }

}
