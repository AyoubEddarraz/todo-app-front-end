import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { DarkModeService } from 'src/app/common/services/dark-mode.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  // darkmode
  darkmode: boolean = false;

  // comming Soon
  commingSoon : AnimationOptions = {
    path: '/assets/animations/commingSoon.json',
  };

  commingSoonDark : AnimationOptions = {
    path: '/assets/animations/commingSoonDark.json',
  };

  constructor(private darkmodeService: DarkModeService) { }

  ngOnInit(): void {
    // get lats status of darkmode
    this.darkmodeService.darkmodeObs.subscribe(status => {
      this.darkmode = status;
    })
  }

}
