import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialsModule } from '../materials.module';

import { MainHeaderComponent } from './main-header/main-header.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { MainDefaultLayoutComponent } from './main-default-layout/main-default-layout.component';

import { ToastComponent } from '../toasts/toast/toast.component';
import { ToasterComponent } from '../toasts/toaster/toaster.component';

import { DialogComponent } from '../dialog/dialog.component';
@NgModule({
  declarations: [
    MainHeaderComponent,
    MainSidebarComponent,
    MainFooterComponent,
    MainDefaultLayoutComponent,
    ToastComponent,
    ToasterComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialsModule
  ],
  exports: [
    MainHeaderComponent,
    MainSidebarComponent,
    MainFooterComponent,
    ToastComponent,
    ToasterComponent,
    DialogComponent,
  ]
})
export class LayoutsModule { }
