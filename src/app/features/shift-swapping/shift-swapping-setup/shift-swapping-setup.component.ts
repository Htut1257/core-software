import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ShiftSwappig } from 'src/app/core/models/shift-swapping.model';
import { SwiftSwappingService } from 'src/app/core/services/swift-swapping/swift-swapping.service';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import * as moment from 'moment'
@Component({
  selector: 'app-shift-swapping-setup',
  templateUrl: './shift-swapping-setup.component.html',
  styleUrls: ['./shift-swapping-setup.component.css']
})
export class ShiftSwappingSetupComponent implements OnInit {
  shiftSwap!: ShiftSwappig
  shiftSwapId: string = ''
  employees: Employee[] = []
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(
    private route: Router, private shiftSwapService: SwiftSwappingService,
    private employeeService: EmployeeService, private toastService: ToastsService
  ) { }

  shiftSwapForm = new FormGroup({
    shiftSwapId: new FormControl({ value: '', disabled: true }),
    fromEmp: new FormControl('', Validators.required),
    toEmp: new FormControl('', Validators.required),
    fromDate: new FormControl(this.todayDate, Validators.required),
    toDate: new FormControl(this.todayDate, Validators.required),
    remark: new FormControl('')
  })

  ngOnInit(): void {
    this.getEmployee()
  }

  //get employe list
  getEmployee() {
    this.employeeService.getEmployee().subscribe(employees => {
      this.employees = employees
    })
  }

  //initialize data with shift swap form
  initializeShiftSwap(shiftSwap: ShiftSwappig) {
    this.shiftSwapForm.setValue({
      shiftSwapId: shiftSwap.shiftSwappingId,
      fromEmp: shiftSwap.fromEmployeeId,
      toEmp: shiftSwap.toEmployeeId,
      fromDate: shiftSwap.fromDate,
      toDate: shiftSwap.toDate,
      remark: shiftSwap.remark
    })
  }

  onSaveShiftSwap(data: any) {
    let ShiftSwap = data
    let fromDate = moment(data.fromDate);
    let fromDateValue = fromDate.format('yyyy-MM-DD ');//fromEmployee and toEmployee
    let toDate = moment(data.fromDate);  //"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
    let toDateValue = toDate.format('yyyy-MM-DD ');

    ShiftSwap.shiftSwappingId = this.shiftSwapId
    ShiftSwap.fromDate = fromDateValue
    ShiftSwap.toDate = toDateValue
    ShiftSwap.userId = '006',
      ShiftSwap.macId = 6

    this.shiftSwapService.saveShiftSwap(ShiftSwap).subscribe(shiftSwap => {
      if (this.shiftSwapId = '') {
        this.shiftSwapService._shiftsSwapping.push(shiftSwap)
        this.toastService.showSuccessToast('', 'Success adding new Shift Swapping')
      } else {
        this.toastService.showSuccessToast('', 'Success editing Shift Swapping')
      }
      this.shiftSwapId = ''
      this.onClear();
      this.shiftSwapService._shiftSwapping = undefined
    })
  }

  //back to Department list
  onBacktoList() {
    this.shiftSwapId = ''
    this.onClear();
    this.shiftSwapService._shiftSwapping = undefined
    this.route.navigate(['/main/shift-swapping']);
  }

  //Clear Data
  onClear() {
    this.clearShiftSwap(this.shiftSwapId)
  }

  clearShiftSwap(id:string){
    this.shiftSwapForm.reset()
    this.reactiveForm.resetForm()
    this.shiftSwapForm.controls['shiftSwapId'].setValue(id)
    this.shiftSwapForm.controls['fromDate'].setValue(this.todayDate)
    this.shiftSwapForm.controls['toDate'].setValue(this.todayDate)
  }

  //compare employee data with initial data
  compareEmployee(e1: Employee, e2: Employee) {
    return e1 && e2 ? e1.employeeId === e2.employeeId : e1 === e2
  }


}
