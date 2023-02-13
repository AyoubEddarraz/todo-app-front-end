import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/account/services/auth.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((data:any) => {
      
      this.authService.confirmAccount(data.token).subscribe((data: string) => {
        console.log(data);
        this.route.navigate(["/account/SignIn"]);
      }, (error:Error) => {
        this.route.navigate(["/account/SignIn"]);
      })

    })

  }

}
