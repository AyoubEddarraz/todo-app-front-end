import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavItems } from 'src/app/common/interfaces/nav-items';
import { DarkModeService } from 'src/app/common/services/dark-mode.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // darkmode
  darkmode: boolean = false;

  // name of menu
  nameMenu1: string = "Profile";
  nameMenu2: string = "FAQ";
  nameMenu3: string = "Notifications";

  // Menu Profile navigation List
  menuProfile: NavItems[] = [
    { name: "profile" , icone: "bi-person" , routeLink: "profile"},
    { name: "FAQ" , icone: "bi-question-circle" , routeLink: "/FAQ"},
    { name: "notifications" , icone: "bi-bell" , routeLink: "/notifications"},
    { name: "settings" , icone: "bi-gear" , routeLink: "settings"},
  ];
  // { name: "log out" , icone: "bi-box-arrow-right" , routeLink: "/logout" , options: "logout"},

  @Output("emitToggleSideMenu") emitToggleSideMenu: EventEmitter<any> = new EventEmitter();

  constructor(private darkmodeService: DarkModeService) { }

  ngOnInit(): void {
    // get lats status of darkmode
    this.darkmodeService.darkmodeObs.subscribe(status => {
      this.darkmode = status;
    })
  }

  // emit Toggle Side Menu Fun
  emitToggleSideMenuFun() {
    this.emitToggleSideMenu.emit();
  }

}
