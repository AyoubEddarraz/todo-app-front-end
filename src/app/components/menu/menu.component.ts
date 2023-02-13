import { Component, Input, OnInit } from '@angular/core';
import { NavItems } from 'src/app/common/interfaces/nav-items';
import { DarkModeService } from 'src/app/common/services/dark-mode.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  // darkmode
  darkmode: boolean = false;

  // Menu List
  @Input("menuList") menuList: NavItems[] = [];

  // name of menu
  @Input("nameMenu") nameMenu: string = "";

  // list of mots supported to add hem line <hr
  listOfSupportedLinks: NavItems["routeLink"][] = ["profile" , "settings"];

  constructor(private darkmodeService: DarkModeService) {}

  ngOnInit(): void {
    // get lats status of darkmode
    this.darkmodeService.darkmodeObs.subscribe(status => {
      this.darkmode = status;
    })
  }

  // table contains this mot if table contains this mot add line in Dom to this item
  checkItemLine(routeLink:string) : boolean{
    if(this.listOfSupportedLinks.indexOf(routeLink) >= 0){
      return true
    }else{
      return false
    }
  }

}
