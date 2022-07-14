import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Uleave } from 'src/app/core/models/uleave.model';
import { LeaveService } from 'src/app/core/services/leave/leave.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-leave-setup',
  templateUrl: './leave-setup.component.html',
  styleUrls: ['./leave-setup.component.css']
})
export class LeaveSetupComponent implements OnInit {

  leave: Uleave ={
    leaveId: '',
    description: '',
    dayCount: 0,
    active: true,
    macId: 0
  }
  leaveId: string = ''

  constructor(private route: Router, private leaveService: LeaveService,private toastService:ToastsService) { }

  leaveForm = new FormGroup({
    description: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    if (this.leaveService._leave != undefined) {
      this.leave = this.leaveService._leave
      this.leaveId = this.leave.leaveId
    }
  }

  //add or edit Leave
  onSaveLeave() {
    const Leave = {
      leaveId: this.leave.leaveId,
      description: this.leave.description,
      dayCount: this.leave.dayCount,
      active: this.leave.active,
      macId: 6
    }
    this.leaveService.saveLeave(Leave).subscribe(leave => {
      if (this.leaveId == '') {
        this.leaveService._leaves.push(leave);
        this.toastService.showSuccessToast('','Success adding new Leave')
      }else{
        this.toastService.showSuccessToast('','Success editing Leave')
      }
      this.leaveId = ''
      this.onClear()
      this.leaveService._leave = this.leave
     
    })
  }

  //back to bonus List
  onBacktoList() {
    this.leaveId = ''
    this.onClear()
    this.leaveService._leave = this.leave
    this.route.navigate(['/main/leave'])
  }

  //clear data
  onClear() {
  this.clearLeave(this.leave,this.leaveId)
  }

  //clear Leave object
  clearLeave(leave:Uleave,id:string){
    leave={
      leaveId: id,
      description: '',
      dayCount: 0,
      active: true,
      macId: 0
    }
    this.leave=leave
  }

}
