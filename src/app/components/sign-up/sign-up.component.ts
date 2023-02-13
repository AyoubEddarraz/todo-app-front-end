import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/account/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private formBuilder: FormBuilder , private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  // Error Sing Up
  singUpError:String = "";

  // Email Pattern Verification
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  singUpForm = this.formBuilder.group({
    name: ["" , Validators.required],
    email: ["" , [ Validators.required , Validators.pattern(this.emailPattern)]],
    password: ["" , Validators.required],
  })

  singUpFun() {

    console.log(this.singUpForm);
    console.log(this.singUpForm.valid);
    console.log(this.singUpForm.value);

    this.authService.register(this.singUpForm.value).subscribe((res) => {

      this.route.navigate(["/account/SignIn"]);
      
    } , (error: string) => {

      if(error == "OK") this.route.navigate(["/account/SignIn"]);
      else this.singUpError = error;
      
    })


  }

}
