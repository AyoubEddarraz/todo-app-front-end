import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavItems } from 'src/app/common/interfaces/nav-items';
import { DarkModeService } from 'src/app/common/services/dark-mode.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  // darkmode
  darkmode: boolean = false;

  // Pc
  platformDevicePc : boolean = false;

  // closed
  @Input("closed") closed: boolean = true;
  @Output("emitToggleSideMenu") emitToggleSideMenu: EventEmitter<any> = new EventEmitter();

  // appName: string = ".do";
  @Input("sideMenuName") sideMenuName: string = "";

  // main list
  @Input("navList") navList:NavItems[] = [];

  // second list
  @Input("secondNavList") secondNavList: NavItems[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private darkmodeService: DarkModeService) {
    breakpointObserver.observe("(max-width:768px)").subscribe((result : BreakpointState) => {
      if(result.matches) this.platformDevicePc = false;
      else this.platformDevicePc = true;
    })
  }

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
