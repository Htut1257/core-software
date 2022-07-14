
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
 import { LoginComponent } from './features/login/login.component';
// import { DashboardComponent } from './features/dashboard/dashboard.component';
 import { MainDefaultLayoutComponent } from './shared/layouts/main-default-layout/main-default-layout.component';

import { BonusComponent } from './features/bonus/bonus/bonus.component';
import { BonusSetupComponent } from './features/bonus/bonus-setup/bonus-setup.component';
import { BonusHisComponent } from './features/bonusHistory/bonus-his/bonus-his.component';
import { BonusHisSetupComponent } from './features/bonusHistory/bonus-his-setup/bonus-his-setup.component';
import { CityComponent } from './features/city/city/city.component';
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
import { LeaveApproveComponent } from './features/leave-approve/leave-approve/leave-approve.component';
import { LeaveSetupComponent } from './features/leave/leave-setup/leave-setup.component';
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
const routes: Routes = [
  {path:'main',component:MainDefaultLayoutComponent,
  children:[
    // {path:'',component:DashboardComponent},
    {path:'bonus',component:BonusComponent},
    {path:'bonus-setup',component:BonusSetupComponent},
    {path:'bonus-assign',component:BonusHisComponent},
    {path:'bonus-assign-setup',component:BonusHisSetupComponent},
    {path:'city',component:CityComponent},
    {path:'city-setup',component:CitySetupComponent},
    {path:'deduction',component:DeductionComponent},
    {path:'deduction-setup',component:DeductionSetupComponent},
    {path:'deduction-assign',component:DeductionHistoryComponent},
    {path:'deduction-assign-setup',component:DeductionHistorySetupComponent},
    {path:'department',component:DepartmentComponent},
    {path:'department-setup',component:DepartmentSetupComponent},
    {path:'department-assign',component:DeptHisComponent},
    {path:'department-assign-setup',component:DeptHisSetupComponent},
    {path:'employee',component:EmployeeComponent},
    {path:'employee-setup',component:EmployeeSetupComponent},
    {path:'holiday',component:HolidayComponent},
    {path:'holiday-setup',component:HolidaySetupComponent},
    {path:'increment',component:IncrementComponent},
    {path:'increment-setup',component:IncrementSetupComponent},
    {path:'job',component:JobComponent},
    {path:'job-setup',component:JobSetupComponent},
    {path:'job-assign',component:JobHistoryComponent},
    {path:'job-assign-setup',component:JobHistorySetupComponent},
    {path:'late',component:LateComponent},
    {path:'late-setup',component:LateSetupComponent},
    {path:'leave',component:LeaveComponent},
    {path:'leave-approve',component:LeaveApproveComponent},
    {path:'leave-setup',component:LeaveSetupComponent},
    {path:'leave-assign',component:LeaveHistoryComponent},
    {path:'leave-assign-setup',component:LeaveHistorySetupComponent},
    {path:'ot',component:OtComponent},
    {path:'ot-setup',component:OtSetupComponent},
    {path:'payday',component:PaydayComponent},
    {path:'payday-setup',component:PaydaySetupComponent},
    {path:'roster',component:RosterComponent},
    {path:'roster-setup',component:RosterSetupComponent},
    {path:'shift',component:ShiftComponent},
    {path:'shift-setup',component:ShiftSetupComponent},
  ]},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
