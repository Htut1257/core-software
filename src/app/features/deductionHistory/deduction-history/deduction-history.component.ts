import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeductionHistory } from 'src/app/core/models/deduction-history.model';
import { DeductionHistoryService } from 'src/app/core/services/deduction-history/deduction-history.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-deduction-history',
  templateUrl: './deduction-history.component.html',
  styleUrls: ['./deduction-history.component.css']
})
export class DeductionHistoryComponent implements OnInit {
  deductionHis: DeductionHistory[] = []
  displayedColumns: string[] = ["position","code", "deduction", "employee", "deductionDate", "amount", "remark","action"]
  dataSource!: MatTableDataSource<DeductionHistory>
  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor(private route: Router, private deductionHisService: DeductionHistoryService,private toastService:ToastsService) { }

  ngOnInit(): void {
    this.getDeductionHistory()
  }

  //get all deduction history list
  getDeductionHistory() {
    this.deductionHisService.getDeductionHistory().subscribe(deductionsHis => {
      this.deductionHis = deductionsHis
      this.dataSource = new MatTableDataSource(deductionsHis)
      this.dataSource.sort = this.sort
      this.dataSource.filterPredicate = (data: DeductionHistory, filter: string) => {
        // return data.deduction.description.toLowerCase().includes(filter) ||
        //   data.employee.description.toLowerCase().includes(filter) ||
        return data.deductionDate.toLowerCase().includes(filter)
      }
    })
  }

  //get job history data from row & to job history setup
  getDeductionHisDataRow(deductionHis: DeductionHistory) {
    this.route.navigate(['/main/deduction-assign-setup']);
    this.deductionHisService._deductionHis = deductionHis;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete Deduction History
  removeDeduction(deductionHis: DeductionHistory) { 
    this.deductionHisService.removeDeductionHistory(deductionHis.deductionHisId).subscribe(data=>{
      if(data.message=="Used"){
        this.toastService.showWarningToast('','the selected '+deductionHis.deductionHisId+' is Used')
        return 
      }
      this.deductionHisService._deduction_his=this.deductionHisService._deduction_his.filter(data=>data.deductionHisId!=deductionHis.deductionHisId)
      this.getDeductionHistory()
      this.toastService.showSuccessToast('','Success deleting '+deductionHis.deductionHisId+'')
    })
  }

}
