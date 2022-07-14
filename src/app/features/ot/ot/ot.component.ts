import { ToastsService } from './../../../shared/toasts.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ot } from 'src/app/core/models/ot.model';
import { OtService } from 'src/app/core/services/ot/ot.service';
import { } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-ot',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.css']
})
export class OtComponent implements OnInit {
  ots: Ot[] = []
  displayedColumns: string[] = ["position","code", "description", "job", "amount", "otMin", "active","action"]
  dataSource!: MatTableDataSource<Ot>
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(private route: Router, private otService: OtService, private toastService: ToastsService) { }

  ngOnInit(): void {
    this.getOt();
  }

  getOt() {
    this.otService.getOt().subscribe(ots => {
      console.log(ots)
      this.dataSource = new MatTableDataSource(ots);
      this.dataSource.sort = this.sort
      this.dataSource.filterPredicate = (data: Ot, filter: string) => {
        return data.description.toLowerCase().includes(filter) //||
        //  data.job.description.toLowerCase().includes(filter)
      }
    })
  }

  //get ot data from row & to ot setup
  getOtDataRow(ot: Ot) {
    this.route.navigate(['/main/ot-setup']);
    this.otService._ot = ot;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete Ot
  removeOt(ot: Ot) {
    this.otService.removeOt(ot.otId).subscribe(data => {
      if (data.message == "Used") {
        this.toastService.showWarningToast('', 'the selected is ' + ot.description + ' Used')
        return
      }
      this.otService._ots = this.otService._ots.filter(data => data.otId != ot.otId)
      this.getOt();
      this.toastService.showSuccessToast('', 'Success deleting ' + ot.description + '')
    })
  }


}
