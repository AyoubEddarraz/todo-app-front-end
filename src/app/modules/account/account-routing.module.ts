import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';
import { AccountComponent } from './account.component';
import { ConfirmAccountComponent } from 'src/app/components/confirm-account/confirm-account.component';

const routes: Routes = [
  { path: '', component: AccountComponent , children: [
    { path: 'SignUp' , component: SignUpComponent },
    { path: 'SignIn' , component: SignInComponent },
  ]},
  { path: 'confirm/:token', component: ConfirmAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
