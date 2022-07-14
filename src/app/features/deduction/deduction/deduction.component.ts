import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Deduction } from 'src/app/core/models/deduction.model';
import { DeductionService } from 'src/app/core/services/deduction/deduction.service';
import { ToastsService } from 'src/app/shared/toasts.service';
@Component({
  selector: 'app-deduction',
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.css']
})
export class DeductionComponent implements OnInit {
  deductions:Deduction[]=[]
  displayedColumns:string[]=["position","code","description","active","action"]
  dataSource!:MatTableDataSource<Deduction>
  @ViewChild(MatSort,{static:true}) sort!:MatSort
  constructor(private deductionService:DeductionService,private route:Router,private toastService:ToastsService) { }

  ngOnInit(): void {
    this.getDeduction();
  }

  //get all Deduction
  getDeduction(){
    this.deductionService.getDeduction().subscribe(deductions=>{
      this.dataSource=new MatTableDataSource(deductions)
      this.dataSource.sort=this.sort
    })  
  }

   //get department data from row & to department setup
   getDeductionDataRow(deduction:Deduction){
    this.route.navigate(['/main/deduction-setup']);
    this.deductionService._deduction=deduction;

  }
 
  //apply filter to table
  applyFilter(event:any){
    let filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

  //delete deduction
  removeDeduction(deduction:Deduction){
    this.deductionService.removeDeduction(deduction.deductionId).subscribe(data=>{
      if(data.message=="Used"){
        this.toastService.showWarningToast("title","the following  is "+deduction.description+" Used")
        return
      }
      this.deductionService._deductions=this.deductionService._deductions.filter(data=>data.deductionId!=deduction.deductionId)
      this.getDeduction();
      this.toastService.showSuccessToast("title","Success deleting "+deduction.description+" ")
    })
  }

}
