import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/core/models/department.model';
import { DepartmentService } from 'src/app/core/services/department/department.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments!: Department[]
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  displayedColumns: string[] = ['position', 'code', 'description', 'active', 'action'];
  dataSource!: MatTableDataSource<Department>
  constructor(
    private departService: DepartmentService, private route: Router,
    private toastService: ToastsService, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDepartment();
  }

  //get all deaprtment
  getDepartment() {
    this.departService.getDepartments().subscribe((departments) => {
      this.departments = departments
      this.dataSource = new MatTableDataSource(this.departments)
      this.dataSource.sort = this.sort;
    });
  }

  //get department data from row & to department setup
  getDepartmentDataRow(department: Department) {
    this.route.navigate(['/main/department-setup']);
    this.departService._department = department;

  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete Department
  removeDepartment(depart: Department) {
    this.dialog.open(DialogComponent)
      .afterClosed().subscribe(confirm => {
        if (confirm) {
          this.departService.removeDepartment(depart.deptId).subscribe(data => {
            if (data.message == "Used") {
              this.toastService.showWarningToast('title', 'the selected ' + depart.description + ' is Used ')
              return
            } else {
              this.departService._departments = this.departService._departments.filter(data => data.deptId != depart.deptId)
              this.getDepartment()
              this.toastService.showSuccessToast('title', 'Succes deleting ' + depart.description + ' ')
            }
          })
        }
      })

  }

}
