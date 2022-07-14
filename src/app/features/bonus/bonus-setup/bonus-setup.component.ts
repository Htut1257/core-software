import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bonus } from 'src/app/core/models/bonus.model';
import { BonusService } from 'src/app/core/services/bonus/bonus.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
@Component({

  selector: 'app-bonus-setup',
  templateUrl: './bonus-setup.component.html',
  styleUrls: ['./bonus-setup.component.css']
})
export class BonusSetupComponent implements OnInit {

  bonus: Bonus = {
    bonusId: '',
    description: '',
    amount: 0,
    active: true,
    macId: 0
  }
  bonusId: string = ''

  //for Form Validation
  bonusForm = new FormGroup({
    description: new FormControl('', Validators.required),
  })

  constructor(private bonusService: BonusService, private route: Router, private toastService: ToastsService) { }

  ngOnInit(): void {
    if (this.bonusService._bonus != undefined) {
      this.bonus = this.bonusService._bonus
      this.bonusId = this.bonusService._bonus.bonusId
    }
  }

  //save or edit Bonus
  onSaveBonus() {
    const Bonus = {
      bonusId: this.bonus.bonusId,
      description: this.bonus.description,
      amount: this.bonus.amount,
      active: this.bonus.active,
      macId: 6
    }
    this.bonusService.saveBonus(Bonus).subscribe(bonus => {
      if (this.bonusId == '') {
        this.bonusService._bonuses.push(bonus)
        this.toastService.showSuccessToast('Success toast title', 'Success adding new Bonus data');
      } else {
        this.toastService.showSuccessToast('Success toast title', 'Success editing  Bonus data');
      }
      this.bonusId = ''
      this.onClear()
      this.bonusService._bonus = this.bonus
    })
  }

  //back to bonus List
  onBacktoList() {
    this.bonusId = ''
    this.onClear()
    this.bonusService._bonus = this.bonus
    this.route.navigate(['/main/bonus'])
  }

  //clear data
  onClear() {
    this.clearBonus(this.bonus, this.bonusId);
  }

  //clear bonus object
  clearBonus(bonus: Bonus, bonusId: string) {
    bonus = {
      bonusId: bonusId,
      description: '',
      amount: 0,
      active: true,
      macId: 0
    }
    this.bonus = bonus
  }
}
