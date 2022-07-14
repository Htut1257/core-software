import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { Gender } from 'src/app/core/models/gender.model';
import { City } from 'src/app/core/models/city.model';
import { CityService } from 'src/app/core/services/city/city.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-employee-setup',
  templateUrl: './employee-setup.component.html',
  styleUrls: ['./employee-setup.component.css']
})
export class EmployeeSetupComponent implements OnInit {

  employee: Employee = {
    employeeId: '',
    description: '',
    remark: '',
    phoneNo: '',
    address: '',
    email: '',
    photoPath: '',
    active: true,
    macId: 0,
  }
  employeeId: string = ''
  gender: Gender[] = [
    {
      genderId: '1',
      description: 'Male'
    },
    {
      genderId: '2',
      description: 'Female'
    }
  ]
  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';


  cities: City[] = []
  constructor(
    private route: Router, private employeeService: EmployeeService,
    private cityService: CityService,private toastService:ToastsService
  ) { }

  ngOnInit(): void {
    this.getCity();
    if (this.employeeService._employee != undefined) {
      this.employee = this.employeeService._employee
      this.employeeId = this.employee.employeeId
    }
  }

  //get job list
  getCity() {
    this.cityService.getCity().subscribe(cities => {
      this.cities = cities
    })
  }

  //add or edit Employee
  onSaveEmployee() {
    const Employee = {
      employeeId: this.employee.employeeId,
      description: this.employee.description,
      remark: this.employee.remark,
      phoneNo: this.employee.phoneNo,
      address: this.employee.address,
      email: this.employee.email,
      photoPath: this.fileAttr,
      active: this.employee.active,
      macId: 6,
      city: this.employee.city,
      gender: this.employee.gender
    }
    this.employeeService.saveEmployee(Employee).subscribe(employee => {
      if (this.employeeId == '') {
        this.employeeService._employees.push(employee)
        this.toastService.showSuccessToast('title','Success adding new Employee')
      }
      else{
        this.toastService.showSuccessToast('title','Success editing Employee')
      }
      this.employeeId = ''
      this.onClear()
      this.employeeService._employee = this.employee
    })
  }

  //back to Employee list
  onBacktoList() {
    this.employeeId = ''
    this.onClear()
    this.employeeService._employee = this.employee
    this.route.navigate(['/main/employee']);
  }

  //Clear Data
  onClear() {
    this.clearEmployee(this.employee, this.employeeId)
  }

  //clear employee object
  clearEmployee(emp: Employee, id: string) {
    emp = {
      employeeId: '',
      description: '',
      remark: '',
      phoneNo: '',
      address: '',
      email: '',
      photoPath: '',
      active: true,
      macId: 0,
    }
    this.employee = emp
  }

  //comapre object in select option tag
  compareJob(c1: Gender, c2: Gender): boolean {
    return c1 && c2 ? c1.genderId === c2.genderId : c1 === c2;
  }

  //comapre object in select option tag
  compareCity(c1: City, c2: City): boolean {
    return c1 && c2 ? c1.cityId === c2.cityId : c1 === c2;
  }

  //Image Files Upload
  uploadFileEvent(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + '-';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';

    } else {
      this.fileAttr = 'Choose File';
    }

  }

}
