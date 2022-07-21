import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Roster } from 'src/app/core/models/roster.model';
import { RosterDetail } from 'src/app/core/models/roster.model';
import { RosterService } from 'src/app/core/services/roster/roster.service';
import { Shift } from 'src/app/core/models/shift.model';
import { ShiftService } from 'src/app/core/services/shift/shift.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import * as moment from 'moment'
export const Column = [
  {
    key: 'position',
    type: 'number',
    label: 'Position',
  },
  {
    key: 'empName',
    type: 'text',
    label: 'emp',
  },
  {
    key: 'deptName',
    type: 'text',
    label: 'dept',
  },
  {
    key: 'job',
    type: 'text',
    label: 'job'
  },
  {
    key: 'isActive',
    type: 'isActive',
    label: '',
  },
]

@Component({
  selector: 'app-roster-setup',
  templateUrl: './roster-setup.component.html',
  styleUrls: ['./roster-setup.component.css']
})
export class RosterSetupComponent implements OnInit {
  roster: Roster = {
    rosterId: '',
    startDate:moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
    endDate: moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD'),
    remark: '',
    userId: '',
    macId: 0
  }
  shifts: Shift[] = []
  rosterDetail: RosterDetail[] = []
  rosterId: string = ''
  todatDate=moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')


  @ViewChild(MatSort) sort!: MatSort
  displayedColumns: string[] = Column.map(data => data.key)
  dataSource: any;
  columnsSchemas: any = Column;
  isActive: boolean = false
  constructor(private route: Router, private rosterService: RosterService, private shiftService: ShiftService) { }

  shiftForm=new FormGroup({
    shift:new FormControl('',Validators.required),
    startDate:new FormControl('',Validators.required),
    endDate:new FormControl('',Validators.required)
  })


  ngOnInit(): void {
    this.getShift()
    this.getRosterEmployee()
    if (this.rosterService._roster != undefined) {
      this.roster = this.rosterService._roster
      this.rosterId = this.roster.rosterId
      this.getRosterDetail(this.rosterId)
    }
  }

  //get shift list
  getShift() {
    this.shiftService.getShift().subscribe(shifts => {
      this.shifts = shifts
    })
  }

  //get employee lists for roster
  getRosterEmployee() {
    this.rosterService.getRosterEmp().subscribe(data => {
      this.dataSource = data
    })
  }

  //roster detail data
  getRosterDetail(id: string) {
    this.rosterService.getRosterDetail(id).subscribe(rosterDetails => {
      this.rosterDetail = rosterDetails
      console.log(rosterDetails)
    })
  }

  //add or edit roster
  onSaveRoster() {
    let startDateVariable = moment(this.roster.startDate);
    let startDateValue = startDateVariable.format('yyyy-MM-DD ');
    let endDateVariable = moment(this.roster.endDate);
    let endDateValue = endDateVariable.format('yyyy-MM-DD ');

    let rosterEmp = this.dataSource.filter((data: any) => data.isActive);
    var employeeRosterData = rosterEmp.reduce(function(filtered:any, option:any) {
      var someNewValue = { 
        rosterDetailId:'',
        rosterId:'',
        employeeId: option.empId,
        uniqueId:'' 
      }
      filtered.push(someNewValue);
      return filtered;
    }, []);

    const Roster = {
      rosterId: '',
      shift:this.roster.shift,
      startDate: startDateValue,
      endDate: endDateValue,
      remark: this.roster.remark,
      userId: '006',
      macId: 6,
      listRosterDetails:employeeRosterData
    }
    console.log(JSON.stringify(Roster))
    this.rosterService.saveRoster(Roster).subscribe(roster=>{
      console.log("Roster Success")
      console.log(roster)
    })
  }

  changeEmpStatus() {
    this.isActive = !this.isActive
  }

  getRosterRowData(emp: any) {
    console.log(emp)
    console.log(this.dataSource)
  }

  //back to bonus List
  onBacktoList() {
    //this.rosterService._roster
    this.route.navigate(['/main/roster'])
  }

  //clear data
  onClear() {

  }

}
