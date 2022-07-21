import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Roster } from 'src/app/core/models/roster.model';
import { RosterService } from 'src/app/core/services/roster/roster.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
  rosters: Roster[] = []
  displayedColumns: string[] = ["position", "shift", "startDate", "endDate", "remark", "action"]
  dataSource!: MatTableDataSource<Roster>
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private route: Router, private rosterService: RosterService,private toastService:ToastsService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getRoster()
  }

  //get all roster
  getRoster() {
    this.rosterService.getRoster().subscribe(rosters => {
      this.rosters = rosters
      this.dataSource = new MatTableDataSource(rosters)
      this.dataSource.sort = this.sort
      this.dataSource.filterPredicate = (data: Roster, filter: string) => {
        return data.rosterId.toLowerCase().includes(filter) //||
         // data.shift.description.toLowerCase().includes(filter)
      }
    })

  }

  //get ot data from row & to ot setup
  getRosterDataRow(roster: Roster) {
    this.route.navigate(['/main/roster-setup']);
    this.rosterService._roster = roster;
  }

  //delete roster
  removeRoster(roster:Roster){
    this.dialog.open(DialogComponent)
    .afterClosed().subscribe(confirm=>{
      if(confirm){
        
      }
    })
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
