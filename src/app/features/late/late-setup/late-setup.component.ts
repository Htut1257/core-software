import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Late } from 'src/app/core/models/late.model';
import { LateService } from 'src/app/core/services/late/late.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-late-setup',
  templateUrl: './late-setup.component.html',
  styleUrls: ['./late-setup.component.css']
})
export class LateSetupComponent implements OnInit {
  late: Late = {
    lateId: '',
    description: '',
    lateMin: 0,
    amount: 0,
    active: true,
    macId: 0
  }
  lateId: string = ''
  constructor(private route: Router, private lateService: LateService,private toastService:ToastsService) { }

  lateForm = new FormGroup({
    description: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    if (this.lateService._late != undefined) {
      this.late = this.lateService._late
      this.lateId = this.late.lateId
    }
  }

  //add or edit Late
  onSaveLate() {
    const late = {
      lateId: this.late.lateId,
      description: this.late.description,
      lateMin: this.late.lateMin,
      amount: this.late.amount,
      active: this.late.active,
      macId: 6
    }
    this.lateService.saveLate(late).subscribe(late => {
      if (this.lateId == '') {
        this.lateService._lates.push(late)
        this.toastService.showSuccessToast('','Success adding new Late')
      } else {
        this.toastService.showSuccessToast('','Success editing Late')
      }
      this.lateId = ''
      this.onClear()
      this.lateService._late = this.late

    })
  }

  //back to Department list
  onBacktoList() {
    this.lateId = ''
    this.onClear()
    this.lateService._late = this.late
    this.route.navigate(['/main/late']);
  }

  //Clear Data
  onClear() {
    this.clearLate(this.late, this.lateId)
  }

  //clear Lae Object
  clearLate(late: Late, id: string) {
    late = {
      lateId: id,
      description: '',
      lateMin: 0,
      amount: 0,
      active: true,
      macId: 0
    }
    this.late = late
  }

}
