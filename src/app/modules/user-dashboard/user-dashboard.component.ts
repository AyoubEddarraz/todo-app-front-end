import { AuthService } from 'src/app/modules/account/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavItems } from 'src/app/common/interfaces/nav-items';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { DarkModeService } from 'src/app/common/services/dark-mode.service';
import { Router } from '@angular/router';
import { ProjectsService } from './modules/overview/services/projects.service';
import { JwtService } from '../account/services/jwt.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  // darkmode
  darkmode: boolean = false;

  // side menu name
  sideMenuName: string = ".do";

  // Current Porjects
  currentProjectsId = "";

  // menu status (closed or not)
  closed : boolean = true;

  // main list
  navList: NavItems[] = [
    { name : "overview" , icone: "bi-house" , routeLink: "overview"},
    { name : "state" , icone: "bi-bar-chart" , routeLink: "state"},
    { name : "projects" , icone: "bi-folder" , routeLink: "projects"},
    { name : "chat" , icone: "bi-chat-right-dots" , routeLink: "chat"},
    { name : "calendar" , icone: "bi-calendar-date" , routeLink: "calendar"}
  ]

  // sedond list
  secondNavList: NavItems[] = [
    { name : "settings" , icone: "bi-gear" , routeLink: "settings"},
  ]

  constructor(private breakpointObserver: BreakpointObserver , private darkmodeService: DarkModeService, private route: Router , private authService: AuthService, private jwtService: JwtService ,private projectsService: ProjectsService) {
    // detect screen size changes
    breakpointObserver.observe("(max-width:768px)").subscribe((result : BreakpointState) => {
      if(result.matches) this.closed = true;
      else this.closed = false;
    })
  }

  ngOnInit(): void {
    // get lats status of darkmode
    this.darkmodeService.darkmodeObs.subscribe(status => {
      this.darkmode = status;
    })

    // Get all projects
    this.projectsService.getAll((this.jwtService.getUserId() as string)).subscribe((projects: any) => {

      // The First Project Id
      this.currentProjectsId = projects[0].projectId;

      // Set the new Route link to Route
      this.navList.forEach(route => {
        if(route.name == "projects"){
          route.routeLink = `projects/${this.currentProjectsId}`
        }
      })

    })

  }

  // change state of Menu (Closed or not)
  toggleSideMenu = () => this.closed = !this.closed;

  // LogOut
  logOut() {
    this.authService.logOut();
    // Do Some Login After Redirect To Sing In
    this.route.navigate(["/account/SignIn"]);
  }

}
