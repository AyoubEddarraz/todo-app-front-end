import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: "" , redirectTo : "home" , pathMatch: "full"},
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) , canActivate: [AuthGuard] },
  { path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) },
  { path: 'dashboard', loadChildren: () => import('./modules/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule) , canActivate: [AuthGuard] },
  { path: "**" , component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
