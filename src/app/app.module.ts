// import { HolidayModule } from './features/holiday/holiday.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
// import { DashboardComponent } from './features/dashboard/dashboard.component';
// import { LoginComponent } from './features/login/login.component';

import { MaterialsModule } from './shared/materials.module';
import { LayoutsModule } from './shared/layouts/layouts.module';

import { CityComponent } from './features/city/city/city.component';
import { LoginComponent } from './features/login/login.component';
import { CitySetupComponent } from './features/city/city-setup/city-setup.component';
import { DeductionComponent } from './features/deduction/deduction/deduction.component';
import { DeductionSetupComponent } from './features/deduction/deduction-setup/deduction-setup.component';
import { DeductionHistoryComponent } from './features/deductionHistory/deduction-history/deduction-history.component';
import { DeductionHistorySetupComponent } from './features/deductionHistory/deduction-history-setup/deduction-history-setup.component';
import { DepartmentComponent } from './features/department/department/department.component';
import { DepartmentSetupComponent } from './features/department/department-setup/department-setup.component';
import { DeptHisComponent } from './features/departmentHistory/dept-his/dept-his.component';
import { DeptHisSetupComponent } from './features/departmentHistory/dept-his-setup/dept-his-setup.component';
import { EmployeeComponent } from './features/employee/employee/employee.component';
import { EmployeeSetupComponent } from './features/employee/employee-setup/employee-setup.component';
import { HolidayComponent } from './features/holiday/holiday/holiday.component';
import { HolidaySetupComponent } from './features/holiday/holiday-setup/holiday-setup.component';
import { IncrementComponent } from './features/increment/increment/increment.component';
import { IncrementSetupComponent } from './features/increment/increment-setup/increment-setup.component';
import { JobComponent } from './features/job/job/job.component';
import { JobSetupComponent } from './features/job/job-setup/job-setup.component';
import { JobHistoryComponent } from './features/job-history/job-history/job-history.component';
import { JobHistorySetupComponent } from './features/job-history/job-history-setup/job-history-setup.component';
import { LateComponent } from './features/late/late/late.component';
import { LateSetupComponent } from './features/late/late-setup/late-setup.component';
import { LeaveComponent } from './features/leave/leave/leave.component';
import { LeaveSetupComponent } from './features/leave/leave-setup/leave-setup.component';
import { LeaveApproveComponent } from './features/leave-approve/leave-approve/leave-approve.component';
import { LeaveHistoryComponent } from './features/leave-history/leave-history/leave-history.component';
import { LeaveHistorySetupComponent } from './features/leave-history/leave-history-setup/leave-history-setup.component';
import { OtComponent } from './features/ot/ot/ot.component';
import { OtSetupComponent } from './features/ot/ot-setup/ot-setup.component';
import { PaydayComponent } from './features/payday/payday/payday.component';
import { PaydaySetupComponent } from './features/payday/payday-setup/payday-setup.component';
import { RosterComponent } from './features/roster/roster/roster.component';
import { RosterSetupComponent } from './features/roster/roster-setup/roster-setup.component';
import { ShiftComponent } from './features/shift/shift/shift.component';
import { ShiftSetupComponent } from './features/shift/shift-setup/shift-setup.component';

import { BonusModule } from './features/bonus/bonus.module';
import { BonusHistoryModule } from './features/bonusHistory/bonus-history.module';

// import { CityModule } from './features/city/city.module';
// import { DeductionModule } from './features/deduction/deduction.module';
// import { DeductionHistoryModule } from './features/deductionHistory/deduction-history.module';
// import { DepartmentModule } from './features/department/department.module';
// import { DepartmentHistoryModule } from './features/departmentHistory/department-history.module';
// import { EmployeeModule } from './features/employee/employee.module';
// import { IncrementModule } from './features/increment/increment.module';
// import { JobModule } from './features/job/job.module';
// import { JobHistoryModule } from './features/job-history/job-history.module';
// import { LateModule } from './features/late/late.module';
// import { LeaveModule } from './features/leave/leave.module';
// import { LeaveHistoryModule } from './features/leave-history/leave-history.module';
// import { OtModule } from './features/ot/ot.module';
// import { PaydayModule } from './features/payday/payday.module';
// import { RosterModule } from './features/roster/roster.module';
// import { ShiftModule } from './features/shift/shift.module';
// import { LeaveApproveComponent } from './features/leave-approve/leave-approve/leave-approve.component';
//ng build --configuration production --base-href /coresoftware/  
@NgModule({ 
  declarations: [
    AppComponent,
      CityComponent,
      LoginComponent,
      CitySetupComponent,
      DeductionComponent,
      DeductionSetupComponent,
      DeductionHistoryComponent,
      DeductionHistorySetupComponent,
      DepartmentComponent,
      DepartmentSetupComponent,
      DeptHisComponent,
      DeptHisSetupComponent,
      EmployeeComponent,
      EmployeeSetupComponent,
      HolidayComponent,
      HolidaySetupComponent,
      IncrementComponent,
      IncrementSetupComponent,
      JobComponent,
      JobSetupComponent,
      JobHistoryComponent,
      JobHistorySetupComponent,
      LateComponent,
      LateSetupComponent,
      LeaveComponent,
      LeaveSetupComponent,
      LeaveApproveComponent,
      LeaveHistoryComponent,
      LeaveHistorySetupComponent,
      OtComponent,
      OtSetupComponent,
      PaydayComponent,
      PaydaySetupComponent,
      RosterComponent,
      RosterSetupComponent,
      ShiftComponent,
      ShiftSetupComponent,
    // DashboardComponent,
    // LoginComponent,
    // LeaveApproveComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MaterialsModule,

    LayoutsModule,
    BonusModule,
    BonusHistoryModule,
    // CityModule,
    // DeductionModule,
    // DeductionHistoryModule,
    // DepartmentModule,
    // DepartmentHistoryModule,
    // EmployeeModule,
    // HolidayModule,
    // IncrementModule,
    // JobModule,
    // JobHistoryModule,
    // LateModule,
    // LeaveModule,
    // LeaveHistoryModule,
    // OtModule,
    // PaydayModule,
    // RosterModule,
    // ShiftModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
