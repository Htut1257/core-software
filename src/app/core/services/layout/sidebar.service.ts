import { Injectable } from '@angular/core';
import { Router,Event,NavigationEnd} from '@angular/router';
import { BehaviorSubject,Observable,of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public appDrawer:any;
  public isDrawer:boolean=false;
  public currentUrl=new BehaviorSubject<string>('');
  
  constructor(private route:Router) {
    this.route.events.subscribe((event:Event)=>{
      if(event instanceof NavigationEnd){
        this.currentUrl.next(event.urlAfterRedirects);
      }
    })
  }

  public openNav(){
    if(this.isDrawer){
      this.appDrawer.close();
      this.isDrawer=false
    }else{
      this.appDrawer.open();
      this.isDrawer=true
    }
  }

  public closeNav(){
    this.appDrawer.close();
    this.isDrawer=false
  }

}
