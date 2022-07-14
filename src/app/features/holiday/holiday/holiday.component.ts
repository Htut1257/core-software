import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Holiday } from 'src/app/core/models/holiday.model';
import { HolidayService } from 'src/app/core/services/holiday/holiday.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  holidays: Holiday[] = []
  displayedColumns: string[] = ["position", "code", "description", "date", "active", "action"]
  dataSource!: MatTableDataSource<Holiday>
  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor(private route: Router, private holidayService: HolidayService, private toastService: ToastsService) { }

  ngOnInit(): void {
    this.getHoliday()
  }

  //get all Holiday
  getHoliday() {
    this.holidayService.getHoliday().subscribe(holidays => {
      this.holidays = holidays
      this.dataSource = new MatTableDataSource(holidays)
      this.dataSource.sort = this.sort
    })
  }

  //get department data from row & to department setup
  getHolidayDataRow(holiday: Holiday) {
    this.route.navigate(['/main/holiday-setup']);
    this.holidayService._holiday = holiday;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete Holiday
  removeHoliday(holiday:Holiday){
    this.holidayService.removeHoliday(holiday.holidayId).subscribe(data=>{
      if(data.message=="Used"){
        this.toastService.showWarningToast('','the selected is '+holiday.description+' Used')
        return
      }
      this.holidayService._holidays=this.holidayService._holidays.filter(data=>data.holidayId!=holiday.holidayId)
      this.getHoliday();
      this.toastService.showSuccessToast('','Success deleting '+holiday.description+'')
      
    })
  }
}
