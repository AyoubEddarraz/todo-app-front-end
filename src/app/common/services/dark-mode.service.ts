import { BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  // dark mode status
  darkmode = new BehaviorSubject<boolean>(false);
  darkmodeObs = this.darkmode.asObservable();

  changeDarkmodestatus = (value: boolean) => {
    this.darkmode.next(value);
    localStorage.setItem("darkmode" , (value ? "true" : "false"));
  };

  constructor() {
    try {
      let darkmodeState = localStorage.getItem("darkmode");
      this.darkmode.next((darkmodeState == 'true' ? true : false));
    } catch (error) {
      console.log(error);
    }
  }

}
