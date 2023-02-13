import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { DarkModeService } from 'src/app/common/services/dark-mode.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

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
