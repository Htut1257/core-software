import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ShiftSwappig } from 'src/app/core/models/shift-swapping.model';
import { SwiftSwappingService } from 'src/app/core/services/swift-swapping/swift-swapping.service';

@Component({
  selector: 'app-shift-swapping',
  templateUrl: './shift-swapping.component.html',
  styleUrls: ['./shift-swapping.component.css']
})
export class ShiftSwappingComponent implements OnInit {
  shiftsSwap: ShiftSwappig[]=[]
  displayedColumns: string[] = ["position","fromEmployee","toEmployee","fromDate","toDate","remark","action"]
  dataSource!: MatTableDataSource<ShiftSwappig>
  constructor(private route: Router, private shiftSwapService: SwiftSwappingService) { }

  ngOnInit(): void {
    this.getShiftSwapping();
  }

  //get all shft swapping
  getShiftSwapping(){
    this.shiftSwapService.getShiftSwapping().subscribe(shiftsSwap=>{
      this.shiftsSwap=shiftsSwap
      console.log(shiftsSwap)
      this.dataSource=new MatTableDataSource(shiftsSwap)

    })
  }

  //get shift data from row & to shift setup
  getShiftSwapDataRow(shift: ShiftSwappig) {
    this.route.navigate(['/main/shift-swapping-setup']);
    this.shiftSwapService._shiftSwapping = shift;
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete Shifft
  removeShift(shift: ShiftSwappig) {
    // this.shiftSwapService.removeShift(shift.shiftId).subscribe(data => {
    //   if (data.message == "Used") {
    //     this.toastService.showWarningToast('', 'the selected ' + shift.description + ' is Used')
    //     return
    //   }
    //   this.shiftService._shifts = this.shiftService._shifts.filter(data => data.shiftId != shift.shiftId)
    //   this.getShift();
    //   this.toastService.showSuccessToast('', 'Success deleting ' + shift.description + ' ')
    // })
  }

}
