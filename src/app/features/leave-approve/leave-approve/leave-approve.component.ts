import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LeaveApproved } from 'src/app/core/models/leave_approved.model';
import { LeaveApproveService } from 'src/app/core/services/leave-approve/leave-approve.service';
import * as moment from 'moment'

@Component({
  selector: 'app-leave-approve',
  templateUrl: './leave-approve.component.html',
  styleUrls: ['./leave-approve.component.css']
})
export class LeaveApproveComponent implements OnInit {

  displayedColumns: string[] = ["position", "leaveHis.leaveHisId", "leaveHis.leave", "emp", "startDate", "endDate", "action"]
  dataSource!: MatTableDataSource<LeaveApproved>
  @ViewChild(MatSort) sort!: MatSort
  constructor(private leaveApproveService: LeaveApproveService) { }

  ngOnInit(): void {
    this.getLeaveApprove()
  }

  getLeaveApprove() {
    this.leaveApproveService.getLeaveApproved().subscribe(leavesApprove => {
      console.log(leavesApprove)
      this.dataSource = new MatTableDataSource(leavesApprove)
      this.dataSource.sortingDataAccessor = (item: any, property) => {
        if (property.includes('.')) return property.split('.').reduce((o: any, i) => o[i], item)
        console.log(item)
        return item[property];
      };
      this.dataSource.sort = this.sort
    })
  }

  saveLeaveApproved(leave: LeaveApproved) {
    let startDateVariable = moment(new Date());
    let startDateValue = startDateVariable.format("yyyy-MM-DD ");
    const Leave = {
      leaveApprovedId: leave.leaveApprovedId,
      leaveHis: leave.leaveHis,
      approvedDate:startDateValue,
      approvedStatus: false,
      userId: '001',
      macId: 6
    }
    this.leaveApproveService.saveLeaveApproved(Leave).subscribe(leave => {
        this.getLeaveApprove()
    })
  }

}
