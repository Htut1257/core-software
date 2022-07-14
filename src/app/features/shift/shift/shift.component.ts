import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Shift } from 'src/app/core/models/shift.model';
import { ShiftService } from 'src/app/core/services/shift/shift.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {
  shifts: Shift[] = []
  dataSource!: MatTableDataSource<Shift>
  displayedColumns: string[] = ["position","code", "description", "startTime","endTime", "Days","action"]
  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor(private route:Router,private shiftService: ShiftService,private toastService:ToastsService) { }

  ngOnInit(): void {
    this.getShift();
  }

  //get all Shift
  getShift() {
    this.shiftService.getShift().subscribe(shifts => {
      this.shifts = shifts
      this.dataSource = new MatTableDataSource(shifts)
      this.dataSource.sort = this.sort
    })
  }

  //get shift data from row & to shift setup
  getLeaveDataRow(shift: Shift) {
    this.route.navigate(['/main/shift-setup']);
    this.shiftService._shift = shift;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete Shifft
  removeShift(shift:Shift){
    this.shiftService.removeShift(shift.shiftId).subscribe(data=>{
      if(data.message=="Used"){
        this.toastService.showWarningToast('','the selected '+shift.description+' is Used')
        return 
      }
      this.shiftService._shifts=this.shiftService._shifts.filter(data=>data.shiftId!=shift.shiftId)
      this.getShift();
      this.toastService.showSuccessToast('','Success deleting '+shift.description+' ')
    })
  }

}
