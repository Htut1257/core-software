import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/core/models/department.model';
import { DepartmentService } from 'src/app/core/services/department/department.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-department-setup',
  templateUrl: './department-setup.component.html',
  styleUrls: ['./department-setup.component.css']
})
export class DepartmentSetupComponent implements OnInit {

  department: Department = {
    deptId: '',
    description: '',
    active: true,
    macId: 0
  }
  departId: string = ''
  constructor(private departService: DepartmentService, private route: Router, private toastService: ToastsService) { }

  departmentForm = new FormGroup({
    description: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    if (this.departService._department != undefined) {
      this.department = this.departService._department
      this.departId = this.departService._department.deptId
    }
  }

  //Add or Edit Department
  onSaveDepartrment() {
    const Department = {
      deptId: this.department.deptId,
      description: this.department.description,
      active: this.department.active,
      macId: 6
    }
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
      this.departService._department = this.department

    })
  }

  //back to Department list
  onBacktoList() {
    this.departId = ''
    this.onClear()
    this.departService._department = this.department
    this.route.navigate(['/main/department']);
  }

  //Clear Data
  onClear() {
    this.clearDepartment(this.department, this.departId)
  }

  //clear department object
  clearDepartment(depart: Department, id: string) {
    depart = {
      deptId: id,
      description: '',
      active: true,
      macId: 0
    }
    this.department = depart
  }

}
