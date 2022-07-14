import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/core/models/city.model';
import { CityService } from 'src/app/core/services/city/city.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-city-setup',
  templateUrl: './city-setup.component.html',
  styleUrls: ['./city-setup.component.css']
})

export class CitySetupComponent implements OnInit {
  city: City = {
    cityId: '',
    description: '',
    active: true,
    macId: 0
  }
  cityId: string = ''
  constructor(private cityService: CityService, private route: Router, private toastService: ToastsService) { }

  //for Form Validation
  cityForm = new FormGroup({
    description: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    if (this.cityService._city != undefined) {
      this.city = this.cityService._city;
      this.cityId = this.cityService._city.cityId;
    }
  }

  //add or edit City data
  onSaveCity() {
    const City = {
      cityId: this.city.cityId,
      description: this.city.description,
      active: this.city.active,
      macId: 6
    }
    this.cityService.saveCity(City).subscribe(city => {
      if (this.cityId == '') {
        this.cityService._cities.push(city)
        this.toastService.showSuccessToast('Success toast title', 'Success adding new City data');
      } else {
        this.toastService.showSuccessToast('Success toast title', 'Success editing CIty data');
      }
      this.cityId = ''
      this.onClear()
      this.cityService._city = this.city
    })
  }

  //back to Department list
  onBacktoList() {
    this.cityId = ''
    this.onClear()
    this.cityService._city = this.city
    this.route.navigate(['/main/city']);
  }

  //Clear Data
  onClear() {
    this.clearCity(this.city, this.cityId)
  }

  //clear City object
  clearCity(city: City, cityId: string) {
    city = {
      cityId: cityId,
      description: '',
      active: true,
      macId: 0
    }
    this.city = city
  }

}
