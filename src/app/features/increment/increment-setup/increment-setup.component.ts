import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Increment } from 'src/app/core/models/increment.model';
import { IncrementService } from 'src/app/core/services/increment/increment.service';
import { Job } from 'src/app/core/models/job.model';
import { JobService } from 'src/app/core/services/job/job.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-increment-setup',
  templateUrl: './increment-setup.component.html',
  styleUrls: ['./increment-setup.component.css']
})
export class IncrementSetupComponent implements OnInit {

  increment:Increment={
    incrementId:'',
    description:'',
    amount:0,
    imonth:0,
    active:true,
    macId:0,
  }
  incrementId:string=''
  jobs:Job[]=[]

  incrementForm=new FormGroup({
    description:new FormControl('',Validators.required),
    job:new FormControl('',Validators.required),
  })

  constructor(
    private route:Router,
    private incrementService:IncrementService,
    private jobService:JobService,private toastService:ToastsService
    ) {

    }

  ngOnInit(): void {
    this.getJobs();
    if(this.incrementService._increment!=undefined){
      this.increment=this.incrementService._increment
      this,this.incrementId=this.increment.incrementId
    }
  }

  //get Job List
  getJobs(){
    this.jobService.getJob().subscribe(jobs=>{
      this.jobs=jobs
    })
  } 

  //add or edit Increment
  onSaveIncrement(){
    const Increment={
      incrementId:this.increment.incrementId,
      description:this.increment.description,
      amount:this.increment.amount,
      imonth:this.increment.imonth,
      active:this.increment.active,
      macId:6,
      job:this.increment.job
    }
    console.log(Increment)
    this.incrementService.saveIncrement(Increment).subscribe(increment=>{
      if(this.incrementId==''){
        this.incrementService._increments.push(increment)
        this.toastService.showSuccessToast('','Success adding new Increment')
      }
      else{
        this.toastService.showSuccessToast('','Success editing Increment')
      }
      this.incrementId=''
      this.onClear()
      this.incrementService._increment=this.increment
     
    })
  }

   //back to Ot list
   onBacktoList(){
    this.incrementId=''
    this.onClear()
    this.incrementService._increment=this.increment
    this.route.navigate(['/main/increment']);
   }
   
   //Clear Data
  onClear(){
    this.clearIncrement(this.increment,this.incrementId)
  }
 
  //clear increment object
  clearIncrement(incre:Increment,id:string){
    incre={
      incrementId:id,
      description:'',
      amount:0,
      imonth:0,
      active:true,
      macId:0,
    }
    this.increment=incre
  }

  //comapre object in select option tag
  compareFn(c1: Job, c2: Job): boolean {
    return c1 && c2 ? c1.jobId === c2.jobId : c1 === c2;
  }

}
