import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Increment } from 'src/app/core/models/increment.model';
import { IncrementService } from 'src/app/core/services/increment/increment.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styleUrls: ['./increment.component.css']
})
export class IncrementComponent implements OnInit {
  increments: Increment[] = []
  displayedColumns: string[] = ["position", "code", "description", "job", "imonth", "amount", "active", "action"]
  dataSource!: MatTableDataSource<Increment>
  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor(
    private route: Router, private incrementService: IncrementService,
    private toastService: ToastsService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getIncrement();
  }

  

  //get all Increment
  getIncrement() {
    this.incrementService.getincrement().subscribe(increments => {
      this.dataSource = new MatTableDataSource(increments);
      this.dataSource.sort = this.sort
      this.dataSource.filterPredicate = (data: Increment, filter: string) => {
        return data.description.toLowerCase().includes(filter)// ||
        //data.job.description.toLowerCase().includes(filter)
      }
    })
  }

  //get ot data from row & to ot setup
  getIncrementDataRow(increment: Increment) {
    this.route.navigate(['/main/increment-setup']);
    this.incrementService._increment = increment;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete Increment
  removeIncrement(incre: Increment) {
    this.dialog.open(DialogComponent)
    .afterClosed().subscribe(confirm=>{
      if(confirm){
        this.incrementService.removeIncrement(incre.incrementId).subscribe(data => {
          if (data.message == "Used") {
            this.toastService.showWarningToast('', 'the selected is ' + incre.description + ' Used')
            return
          }
          this.incrementService._increments = this.incrementService._increments.filter(data => data.incrementId != incre.incrementId)
          this.getIncrement();
          this.toastService.showSuccessToast('', 'Success deleting ' + incre.description + ' ')
        })
      }
    })
  
  }

}
