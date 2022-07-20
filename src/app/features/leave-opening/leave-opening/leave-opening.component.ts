import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LeaveOpening } from 'src/app/core/models/leave-opening.model';
import { LeaveOpeningService } from 'src/app/core/services/leave-opening/leave-opening.service';
@Component({
  selector: 'app-leave-opening',
  templateUrl: './leave-opening.component.html',
  styleUrls: ['./leave-opening.component.css']
})
export class LeaveOpeningComponent implements OnInit {
  leavesOpening: LeaveOpening[] = []
  displayedColumns: string[] = ["position", "code", "employee", "leave", "dayCount", "date", "action"]
  dataSource!: MatTableDataSource<LeaveOpening>
  constructor(private route: Router, private leaveOpeningService: LeaveOpeningService) {

  }

  ngOnInit(): void {
    this.getLeaveOpening();
  }

  //get all leave opening
  getLeaveOpening() {
    this.leaveOpeningService.getLeaveOpening().subscribe(leavesOpeing => {
      this.leavesOpening = leavesOpeing
      this.dataSource = new MatTableDataSource(leavesOpeing)

    })
  }

  //get job history data from row & to job history setup
  getLeaveOpeningDataRow(row:LeaveOpening){
    this.route.navigate(['/main/leave-opening-setup']);
    this.leaveOpeningService._leaveOpening=row
  }

  // delete Leave Opening
  removeLeaveOpening(row:LeaveOpening){

  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeEvent(event:any){
    console.log('changed'+event.value)
  }

}
