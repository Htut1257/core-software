import { Component, OnInit,Input,HostBinding } from '@angular/core';
import { NavItem } from 'src/app/core/models/nav-item.model';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/core/services/layout/sidebar.service';
import {animate,state,style,transition,trigger,} from '@angular/animations';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css'],
  animations:[
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class MainSidebarComponent implements OnInit {
  expanded:boolean=false
  @Input() item!:NavItem
  @Input() depth!:number
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  constructor(public route:Router,public sideService:SidebarService) { }

  ngOnInit(): void {
    this.sideService.currentUrl.subscribe((url:string)=>{
      if(this.item.children && url){
       // this.expanded = url.indexOf(`/${this.Namess}/${this.item.menuName}`) === 0;
       // this.expanded = url.indexOf(`/${this.item.route?.toLowerCase()}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    })
  }

  onItemSelected(item:NavItem){
    if (!item.children || !item.children.length) {
      //let uri=this.Namess+'/'+item.menuName
      let uri=item.route?.toLowerCase()
      this.route.navigate([uri]);
      this.sideService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }


}
