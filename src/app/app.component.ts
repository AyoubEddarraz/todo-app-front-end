import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { JwtService } from './modules/account/services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'gestion-taches-pro';

  constructor(private jwtService: JwtService) {
    console.log("hey i'm me the jwt  : "  , jwtService.getToken() );
  }


}
