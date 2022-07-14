import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonusHisComponent } from './bonus-his/bonus-his.component';
import { BonusHisSetupComponent } from './bonus-his-setup/bonus-his-setup.component';
import { MaterialsModule } from 'src/app/shared/materials.module';

@NgModule({
  declarations: [
    BonusHisComponent,
    BonusHisSetupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialsModule
  ],
  exports:[
    BonusHisComponent,
    BonusHisSetupComponent
  ]
})
export class BonusHistoryModule { }
