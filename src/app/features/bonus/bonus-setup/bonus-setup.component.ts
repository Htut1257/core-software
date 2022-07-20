import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Bonus } from 'src/app/core/models/bonus.model';
import { BonusService } from 'src/app/core/services/bonus/bonus.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { Validators, FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
@Component({

  selector: 'app-bonus-setup',
  templateUrl: './bonus-setup.component.html',
  styleUrls: ['./bonus-setup.component.css']
})
export class BonusSetupComponent implements OnInit {

  bonus!: Bonus
  bonusId: string = ''
  @ViewChild('noteForm', { static: true }) noteForm: NgForm;

  //for Form Validation
  bonusForm = new FormGroup({
    bonusId: new FormControl({ value: '', disabled: true }),
    description: new FormControl('', Validators.required),
    active: new FormControl(true)
  })

  constructor(
    private bonusService: BonusService, private route: Router,
    private toastService: ToastsService, public dialog: MatDialog
  ) {
    this.bonus = {} as Bonus
  }

  ngOnInit(): void {
    if (this.bonusService._bonus != undefined) {

      console.log(this.bonusService._bonus)
      this.bonus = this.bonusService._bonus
      this.bonusId = this.bonusService._bonus.bonusId
      this.initialBonusFormData(this.bonus)
    }
  }

  //Fill Form data on Edit
  initialBonusFormData(bonus: Bonus) {
    this.bonusForm.setValue({
      bonusId: bonus.bonusId,
      description: bonus.description,
      active: bonus.active
    })
  }

  //save or edit Bonus
  onSaveBonus(data: any) {
    let Bonus = data
    Bonus.bonusId=this.bonusId
    Bonus.macId = 6
    this.bonusService.saveBonus(Bonus).subscribe(bonus => {
      if (this.bonusId == '') {
        this.bonusService._bonuses.push(bonus)
        this.toastService.showSuccessToast('Success toast title', 'Success adding new Bonus data');
      } else {
        this.toastService.showSuccessToast('Success toast title', 'Success editing  Bonus data');
      }
      this.bonusId = ''
      this.onClear()
      this.bonusService._bonus = undefined
    })
  }

  //back to bonus List
  onBacktoList() {
    this.bonusId = ''
    this.onClear()
    this.bonusService._bonus = undefined
    this.route.navigate(['/main/bonus'])
  }

  //clear data
  onClear() {
    this.bonus = {} as Bonus
    this.clearBonus(this.bonusId);
   
  }

  //clear bonus object
  clearBonus(id: string) {
    this.bonusForm.reset()
    this.noteForm.resetForm();
    this.bonusForm.controls['bonusId'].setValue(id)
    this.bonusForm.controls['active'].setValue(true)
  }
}
