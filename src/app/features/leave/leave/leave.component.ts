import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Uleave } from 'src/app/core/models/uleave.model';
import { LeaveService } from 'src/app/core/services/leave/leave.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  leaves:Uleave[]=[]
  displayedColumns:string[]=["position","code","description","dayCount","active","action"]
  dataSource!:MatTableDataSource<Uleave>
  @ViewChild(MatSort,{static:true})sort!:MatSort

  constructor(private route:Router,private leaveService:LeaveService,private toastService:ToastsService) { }

  ngOnInit(): void {
    this.getLeave();
  }

  //get all Leave
  getLeave(){
    this.leaveService.getLeaves().subscribe(leaves=>{
      this.dataSource=new MatTableDataSource(leaves)
      this.dataSource.sort=this.sort
    })
  }

  //get ot data from row & to ot setup
  getLeaveDataRow(leave:Uleave){
    this.route.navigate(['/main/leave-setup']);
    this.leaveService._leave=leave;
  }

  //apply filter to table
  applyFilter(event:any){
    let filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

  //delete Leave
  removeLeave(leave:Uleave){
    this.leaveService.removeLeave(leave.leaveId).subscribe(data=>{
      if(data.message=="Used"){
        this.toastService.showSuccessToast('','the selected is '+leave.description+' Used')
        return 
      }
      this.leaveService._leaves=this.leaveService._leaves.filter(data=>data.leaveId!=leave.leaveId)
      this.getLeave();
      this.toastService.showSuccessToast('','Success deleting '+leave.description+' ')
    })
  }

}
