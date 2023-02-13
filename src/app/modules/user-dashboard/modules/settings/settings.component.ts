import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/common/services/dark-mode.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  // darkmode
  darkmode: boolean = false;

  constructor(private darkmodeService: DarkModeService) {}

  ngOnInit(): void {
    // get the last value of darkmode
    this.darkmodeService.darkmodeObs.subscribe(status => {
      this.darkmode = status;
    })
  }

  // change the state of darkmode
  changeDarkmodeState() {
    this.darkmodeService.changeDarkmodestatus(this.darkmode);
  }

}
