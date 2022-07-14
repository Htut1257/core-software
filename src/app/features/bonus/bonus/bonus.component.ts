import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Bonus } from 'src/app/core/models/bonus.model';
import { BonusService } from 'src/app/core/services/bonus/bonus.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {
  bonuses!: Bonus[]
  @ViewChild(MatSort) sort!: MatSort
  displayedColumns: String[] = ["position", "code", "description", "active", "action"]//"amount",
  dataSource!: MatTableDataSource<Bonus>
  constructor(private bonusService: BonusService, private route: Router, private toastService: ToastsService) { }

  ngOnInit(): void {
    this.getBonus();
  }

  //get all Bonus
  getBonus() {
    this.bonusService.getBonus().subscribe(bonus => {
      this.bonuses = bonus
      this.dataSource = new MatTableDataSource(this.bonuses)
      this.dataSource.sort = this.sort
    })
  }

  //get Bonus data from row & to Bonus setup
  getDepartmentDataRow(bonus: Bonus) {
    this.route.navigate(['/main/bonus-setup']);
    this.bonusService._bonus = bonus;

  }

  //delete Bonus data
  removeBonus(bonus: Bonus) {
    this.bonusService.removeBonus(bonus.bonusId).subscribe(data => {
      let result = data
      if (result.message == "Used") {
        this.toastService.showWarningToast('title', 'the selected ' + bonus.description + ' is Used')
        return
      }
      this.bonusService._bonuses = this.bonusService._bonuses.filter(bonuses => bonuses.bonusId !== bonus.bonusId)
      this.getBonus();
      this.toastService.showSuccessToast('title', 'Success deleting ' + bonus.description + '')
    })
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
