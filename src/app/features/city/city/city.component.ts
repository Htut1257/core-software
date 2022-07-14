import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/core/models/city.model';
import { CityService } from 'src/app/core/services/city/city.service';
import { ToastsService } from 'src/app/shared/toasts.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: City[] = []
  @ViewChild(MatSort, { static: true }) sort!: MatSort
  displayedColumns: string[] = ['position', 'code', 'description', 'active', 'action'];
  dataSource!: MatTableDataSource<City>
  constructor(private cityService: CityService, private route: Router, private toastService: ToastsService) { }

  ngOnInit(): void {
    this.getCity();
  }

  //get all cities
  getCity() {
    this.cityService.getCity().subscribe(cities => {
      this.cities = cities
      this.dataSource = new MatTableDataSource(this.cities);
      this.dataSource.sort = this.sort;
    })
  }

  //get city data from row & to city setup
  getCityDataRow(city: City) {
    this.route.navigate(['/main/city-setup'])
    this.cityService._city = city
  }

  //apply filter to table
  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //delete City data
  removeCity(city: City) {
    this.cityService.removeCity(city.cityId).subscribe(data => {
      if (data.message == 'Used') {
        this.toastService.showWarningToast('title', 'the following ' + city.description + ' is Used')
      } else {
        this.cityService._cities = this.cityService._cities.filter(data => data.cityId != city.cityId)
        this.getCity()
        this.toastService.showSuccessToast('title', 'Success in deleting ' + city.description + ' ')
      }
    })
  }

}
