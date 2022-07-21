import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { LeaveHistory } from 'src/app/core/models/leave-history.model';
import { LeaveHistoryService } from 'src/app/core/services/leave-history/leave-history.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css']
})
export class LeaveHistoryComponent implements OnInit {
  leaveHis: LeaveHistory[] = []
  displayedColumns: string[] = ["position", "code", "leave", "employee", "startDate", "endDate", "remark", "action"]
  dataSource!: MatTableDataSource<LeaveHistory>
  @ViewChild(MatSort, { static: true }) sort!: MatSort
  constructor(
    private route: Router, private leaveHisService: LeaveHistoryService,
     private toastService: ToastsService,public dialog:MatDialog
     ) { }

  ngOnInit(): void {
    this.getLeaveHistory();
  }

  //get all Leave history
  getLeaveHistory() {
    this.leaveHisService.getLeaveHistory().subscribe(leaveHis => {
      this.dataSource = new MatTableDataSource(leaveHis)
      this.dataSource.sort = this.sort
      this.dataSource.filterPredicate = (data: LeaveHistory, filter: string) => {
        return data.employee.description.toLowerCase().includes(filter) ||
          data.leave.description.toLowerCase().includes(filter) ||
          data.startDate.toLowerCase().includes(filter) ||
          data.endDate.toLowerCase().includes(filter)
      }
    })
  }

  //get job history data from row & to job history setup
  getLeaveHisDataRow(leaveHis: LeaveHistory) {
    this.route.navigate(['/main/leave-assign-setup']);
    this.leaveHisService._leaveHis = leaveHis;
  }



  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete leave history
  removeLeavehis(leaveHis: LeaveHistory) {
    this.dialog.open(DialogComponent)
    .afterClosed().subscribe(confirm=>{
      if(confirm){
        this.leaveHisService.removeLeaveHis(leaveHis.leaveHisId).subscribe(data => {
          if (data.message == "Used") {
            this.toastService.showWarningToast('', 'the selected ' + leaveHis.leaveHisId + ' is Used')
            return
          }
          this.leaveHisService._leave_his = this.leaveHisService._leave_his.filter(data => data.leaveHisId != leaveHis.leaveHisId)
          this.getLeaveHistory()
          this.toastService.showSuccessToast('', 'Success deleting ' + leaveHis.leaveHisId + '')
        })
      }
    })
  }
}
