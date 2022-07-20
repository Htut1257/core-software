import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Attendance } from 'src/app/core/models/attendance.model';
import { AttendanceService } from 'src/app/core/services/attendance/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  attendances: Attendance[]=[]
  displayedColumns:string[]=['position','code','employee','attenDate','startTime','endTime','action']
  dataSource:MatTableDataSource<Attendance>
  constructor(private route: Router, private attenService: AttendanceService) {

  }

  ngOnInit(): void {
   this.getAttendance()
  }

  //get all Attendance
  getAttendance(){
    this.attenService.getAttendance().subscribe(attens=>{
      this.attendances=attens
      this.dataSource=new MatTableDataSource(attens)

    })
  }

  //get shift data from row & to shift setup
  getAttendanceDataRow(atten:Attendance) {
    this.route.navigate(['/main/attendance-setup']);
    this.attenService._atten = atten;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete Shifft
  removeAttendance(shift:Attendance){
  
  }

}
