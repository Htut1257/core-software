import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/layout/sidebar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(public sideService:SidebarService,private route:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.route.navigate(['/']);
  }

}
