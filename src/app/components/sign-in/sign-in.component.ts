import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/account/services/auth.service';
import { JwtService } from 'src/app/modules/account/services/jwt.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private formBuilder: FormBuilder , private route: Router , private authService: AuthService , private jwtService: JwtService) { }

  ngOnInit(): void {
  }

  // Sign in Error
  signInError: String = "";

  // Email Pattern Verification
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  singInForm = this.formBuilder.group({
    email: ["" , [ Validators.required , Validators.pattern(this.emailPattern)]],
    password: ["" , Validators.required]
  })

  singInFun() {

    console.log(this.singInForm);
    console.log(this.singInForm.valid);
    console.log(this.singInForm.value);

    this.authService.login(this.singInForm.value).subscribe((res:any) => {

      console.log(res);

      this.jwtService.setToken(res.accessToken);
      this.jwtService.setUserId(res.uid);
      this.jwtService.setRefreshToken(res.refreshToken);

      this.jwtService.setCurrentUser(res);
      this.route.navigateByUrl("/dashboard");

    } , (error : string) => {
      this.signInError = error;
    })


  }

}
