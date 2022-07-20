import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/core/models/department.model';
import { DepartmentService } from 'src/app/core/services/department/department.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { Validators, FormControl, FormGroup,NgForm } from '@angular/forms';

@Component({
  selector: 'app-department-setup',
  templateUrl: './department-setup.component.html',
  styleUrls: ['./department-setup.component.css']
})
export class DepartmentSetupComponent implements OnInit {

  department: Department
  departId: string = ''
  @ViewChild('reactiveForm',{static:true})reactiveForm:NgForm
  constructor(
    private departService: DepartmentService, private route: Router, 
    private toastService: ToastsService
    ) {
      this.department={} as Department
     }

  departmentForm = new FormGroup({
    departmentId:new FormControl({value:'',disabled:true}),
    description: new FormControl('', Validators.required),
    active:new FormControl(true)
  });

  ngOnInit(): void {
    if (this.departService._department != undefined) {
      this.department = this.departService._department
      this.departId = this.departService._department.deptId
      this.initializeFormData(this.department)
    }
  }

  //fill form data on edit
  initializeFormData(data:Department){
    this.departmentForm.setValue({
      departmentId:data.deptId,
      description:data.description,
      active:data.active
    })
  }

  //Add or Edit Department
  onSaveDepartrment(data:any) {
    let Department=data
    Department.deptId=this.departId
    Department.macId=6
    this.departService.saveDeparments(Department).subscribe((department) => {
      if (this.departId == '') {
        this.departService._departments.push(department);
        this.toastService.showSuccessToast('title','Success adding new Department')
      }
      else {
        this.toastService.showSuccessToast('title','Success editing Department')
      }
      this.departId = ''
      this.onClear()
      this.departService._department =undefined

    })
  }

  //back to Department list
  onBacktoList() {
    this.departId = ''
    this.onClear()
    this.departService._department = undefined
    this.route.navigate(['/main/department']);
  }

  //Clear Data
  onClear() {
    this.clearDepartment(this.departId)
  }

  //clear department object
  clearDepartment( id: string) {
    this.departmentForm.reset();
    this.reactiveForm.resetForm();
    this.departmentForm.controls['departmentId'].setValue(id)
    this.departmentForm.controls['active'].setValue(true)
  }

}
