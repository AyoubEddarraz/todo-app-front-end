import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { DarkModeService } from 'src/app/common/services/dark-mode.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  // darkmode
  darkmode: boolean = false;

  // comming Soon
  commingSoon : AnimationOptions = {
    path: '/assets/animations/404.json',
  };

  commingSoonDark : AnimationOptions = {
    path: '/assets/animations/404.json',
  };

  constructor(private darkmodeService: DarkModeService) { }

  ngOnInit(): void {
    // get lats status of darkmode
    this.darkmodeService.darkmodeObs.subscribe(status => {
      this.darkmode = status;
    })
  }


}
