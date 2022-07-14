import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Late } from 'src/app/core/models/late.model';
import { LateService } from 'src/app/core/services/late/late.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
@Component({
  selector: 'app-late',
  templateUrl: './late.component.html',
  styleUrls: ['./late.component.css']
})
export class LateComponent implements OnInit {
  lates: Late[] = []
  displayedColumns: string[] = ["position", "code", "description", "lateMin", "amount", "active", "action"]
  dataSource!: MatTableDataSource<Late>
  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor(private route: Router, private lateService: LateService, private toastService: ToastsService) { }

  ngOnInit(): void {
    this.getLate();
  }

  //get Late data
  getLate() {
    this.lateService.getLate().subscribe(lates => {
      this.dataSource = new MatTableDataSource(lates)
      this.dataSource.sort = this.sort
    })
  }

  //get Late data from row & to Late setup
  getJobDataRow(late: Late) {
    this.route.navigate(['/main/late-setup']);
    this.lateService._late = late;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete late
  removeLate(late: Late) {
    this.lateService.removeLate(late.lateId).subscribe(data => {
      if (data.message == "Used") {
        this.toastService.showWarningToast('', 'the selected ' + late.description + ' is Used ')
        return
      }
      this.lateService._lates = this.lateService._lates.filter(data => data.lateId != late.lateId)
      this.getLate();
      this.toastService.showSuccessToast('', 'Success deleting ' + late.description + '')
    })
  }

}
