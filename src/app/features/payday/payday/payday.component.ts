import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Payday } from 'src/app/core/models/payday.model';
import { PaydayService } from 'src/app/core/services/payday/payday.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
@Component({
  selector: 'app-payday',
  templateUrl: './payday.component.html',
  styleUrls: ['./payday.component.css']
})
export class PaydayComponent implements OnInit {
  paydays: Payday[] = []
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  displayedColumns: string[] = ['position', 'code', 'description', 'dayCount', 'action'];
  dataSource!: MatTableDataSource<Payday>
  constructor(
    private route: Router, private paydayService: PaydayService,
    private toastService: ToastsService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPayday();
  }

  //get all payday
  getPayday() {
    this.paydayService.getPayday().subscribe(paydays => {
      console.log(paydays)
      this.paydays = paydays;
      this.dataSource = new MatTableDataSource(paydays);
      this.dataSource.sort = this.sort
    })
  }

  //get payday data from row & to payday setup
  getPaydayDataRow(payday: Payday) {
    this.route.navigate(['/main/payday-setup']);
    this.paydayService._payday = payday;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete payDay
  removePayDay(payDay: Payday) {
    this.dialog.open(DialogComponent)
      .afterClosed().subscribe(confirm => {
        if (confirm) {
          this.paydayService.removePayDay(payDay.payDayId).subscribe(data => {
            if (data.message == "Used") {
              this.toastService.showWarningToast('', 'the selected is ' + payDay.description + ' Used')
              return
            }
            this.paydayService._paydays = this.paydayService._paydays.filter(data => data.payDayId != payDay.payDayId)
            this.getPayday()
            this.toastService.showSuccessToast('', 'Success deleting ' + payDay.description + '')
          })
        }
      })

  }

}
