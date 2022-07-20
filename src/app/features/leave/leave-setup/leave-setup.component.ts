import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Uleave } from 'src/app/core/models/uleave.model';
import { LeaveService } from 'src/app/core/services/leave/leave.service';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-leave-setup',
  templateUrl: './leave-setup.component.html',
  styleUrls: ['./leave-setup.component.css']
})
export class LeaveSetupComponent implements OnInit {

  leave: Uleave
  leaveId: string = ''
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(private route: Router, private leaveService: LeaveService, private toastService: ToastsService) { }

  leaveForm = new FormGroup({
    leaveId: new FormControl({ value: '', disabled: true }),
    description: new FormControl('', Validators.required),
    dayCount: new FormControl(0),
    active: new FormControl(true)
  })

  ngOnInit(): void {
    if (this.leaveService._leave != undefined) {
      this.leave = this.leaveService._leave
      this.leaveId = this.leave.leaveId
      this.initialiizeFormData(this.leave)
    }
  }

  //fill form data on edit
  initialiizeFormData(data: Uleave) {
    this.leaveForm.setValue({
      leaveId: data.leaveId,
      description: data.description,
      dayCount: data.dayCount,
      active: data.active
    })
  }

  //add or edit Leave
  onSaveLeave(data: any) {

    let Leave = data
    Leave.leaveId = this.leaveId
    Leave.macId = 6

    this.leaveService.saveLeave(Leave).subscribe(leave => {
      if (this.leaveId == '') {
        this.leaveService._leaves.push(leave);
        this.toastService.showSuccessToast('', 'Success adding new Leave')
      } else {
        this.toastService.showSuccessToast('', 'Success editing Leave')
      }
      this.leaveId = ''
      this.onClear()
      this.leaveService._leave = undefined

    })
  }

  //back to bonus List
  onBacktoList() {
    this.leaveId = ''
    this.onClear()
    this.leaveService._leave = undefined
    this.route.navigate(['/main/leave'])
  }

  //clear data
  onClear() {
    this.clearLeave(this.leaveId)
  }

  //clear Leave object
  clearLeave(id: string) {
    this.leaveForm.reset()
    this.reactiveForm.resetForm()
    this.leaveForm.controls['leaveId'].setValue(id)
    this.leaveForm.controls['active'].setValue(true)
  }

}
