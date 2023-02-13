import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/common/services/dark-mode.service';

@Component({
  selector: 'app-settings-item',
  templateUrl: './settings-item.component.html',
  styleUrls: ['./settings-item.component.scss']
})
export class SettingsItemComponent implements OnInit {

  // darkmode
  darkmode: boolean = false;

  constructor(private darkmodeService: DarkModeService) { }

  ngOnInit(): void {
    // get lats status of darkmode
    this.darkmodeService.darkmodeObs.subscribe(status => {
      this.darkmode = status;
    })
  }

}
