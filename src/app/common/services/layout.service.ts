import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  // Available Screen
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  // BreakPoints Disponible
  breakPoints = [Breakpoints.XSmall , Breakpoints.Small , Breakpoints.Medium , Breakpoints.Large , Breakpoints.XLarge];

  // Current page
  currentWindows = new BehaviorSubject<string>("");
  currentWindowsObs = this.currentWindows.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(this.breakPoints).subscribe((result) => {
      for(const query of Object.keys(result.breakpoints)){
        if(result.breakpoints[query]){
          this.currentWindows.next(this.displayNameMap.get(query) ?? 'Unknown');
          console.log(this.currentWindows.value);
        }
      }
    })
  }

}
