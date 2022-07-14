import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BonusHistory } from 'src/app/core/models/bonus_his.model';
import { BonusHistoryService } from 'src/app/core/services/bonus-history/bonus-history.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-bonus-his',
  templateUrl: './bonus-his.component.html',
  styleUrls: ['./bonus-his.component.css']
})
export class BonusHisComponent implements OnInit {
  bonusHis: BonusHistory[] = []
  displayedColumns: string[] = ["position","code", "bonus", "employee", "bonusDate", "remark", "amount","action"]
  dataSource!: MatTableDataSource<BonusHistory>
  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor(private route: Router, private bonusHisService: BonusHistoryService, private toastService: ToastsService) { }

  ngOnInit(): void {
    this.getBonusHistory()
  }

  //get bonus history
  getBonusHistory() {
    this.bonusHisService.getBonusHistory().subscribe(bonusHis => {
      this.dataSource = new MatTableDataSource(bonusHis)
      this.dataSource.sort = this.sort
      this.dataSource.filterPredicate = (data: BonusHistory, filter: string) => {
        return data.bonusDate.toLowerCase().includes(filter) ||
          // data.bonus.description.includes(filter) ||
          // data.employee.description.includes(filter) ||
          data.amount.toString().toLowerCase().includes(filter)
      }
    })
  }

  //get Bonus history data from row & to Bonus history setup
  getBonusHisDataRow(bonusHis: BonusHistory) {
    this.route.navigate(['/main/bonus-assign-setup']);
    this.bonusHisService._bonusHis = bonusHis;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete bonus History
  removeBonusHistory(bonusHis:BonusHistory){
    this.bonusHisService.removeBonusHistory(bonusHis.bonusHisId).subscribe(data=>{
      if(data.message=="Used"){
        this.toastService.showWarningToast('','the selected '+bonusHis.bonusHisId+' is Used')
        return 
      }
      this.bonusHisService._bonus_his= this.bonusHisService._bonus_his.filter(data=>data.bonusHisId!=bonusHis.bonusHisId)
      this.getBonusHistory()
      this.toastService.showSuccessToast('','Success deleting '+bonusHis.bonusHisId+'')
    })
  }

}
