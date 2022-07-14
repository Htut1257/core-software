import { RouterModule } from '@angular/router';
import { BonusSetupComponent } from './bonus-setup/bonus-setup.component';
import { BonusComponent } from './bonus/bonus.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from 'src/app/shared/materials.module';



@NgModule({
  declarations: [
    BonusComponent,
    BonusSetupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialsModule,
  ],
  exports:[
    BonusComponent,
    BonusSetupComponent
  ]
})
export class BonusModule { }
