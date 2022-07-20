import { Component, OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/core/models/city.model';
import { CityService } from 'src/app/core/services/city/city.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { Validators, FormControl, FormGroup,NgForm} from '@angular/forms';
@Component({
  selector: 'app-city-setup',
  templateUrl: './city-setup.component.html',
  styleUrls: ['./city-setup.component.css']
})

export class CitySetupComponent implements OnInit {
  city: City
  cityId: string = ''
  @ViewChild('reactiveForm',{static:true}) reactiveForm:NgForm
  constructor(private cityService: CityService, private route: Router, private toastService: ToastsService) { }

  //for Form Validation
  cityForm = new FormGroup({
    cityId:new FormControl({value:'',disabled:true}),
    description: new FormControl('', Validators.required),
    active:new FormControl(true)
  })

  ngOnInit(): void {
    if (this.cityService._city != undefined) {
      this.city = this.cityService._city;
      this.cityId = this.cityService._city.cityId;
      this.initializeForm(this.city)
    }
  }

  //fill form data on edit
  initializeForm(city:City){
    this.cityForm.setValue({
      cityId:city.cityId,
      description:city.description,
      active:city.active
    })
  }

  //add or edit City data
  onSaveCity(data:any) {
    let City=data
    City.cityId=this.cityId
    City.macId=6
    this.cityService.saveCity(City).subscribe(city => {
      if (this.cityId == '') {
        this.cityService._cities.push(city)
        this.toastService.showSuccessToast('Success toast title', 'Success adding new City data');
      } else {
        this.toastService.showSuccessToast('Success toast title', 'Success editing CIty data');
      }
      this.cityId = ''
      this.onClear()
      this.cityService._city = undefined
    })
  }

  //back to Department list
  onBacktoList() {
    this.cityId = ''
    this.onClear()
    this.cityService._city = undefined
    this.route.navigate(['/main/city']);
  }

  //Clear Data
  onClear() {
    this.clearCity(this.cityId)
  }

  //clear City object
  clearCity( id: string) {
    this.cityForm.reset()
    this.reactiveForm.resetForm()
    this.cityForm.controls['cityId'].setValue(id)
    this.cityForm.controls['active'].setValue(true)
  }

}
