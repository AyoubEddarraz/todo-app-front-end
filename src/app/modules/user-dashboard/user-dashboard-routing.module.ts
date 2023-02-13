import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/common/guards/auth.guard';
import { UserDashboardComponent } from './user-dashboard.component';

const routes: Routes = [
  { path: '', component: UserDashboardComponent , canActivate: [AuthGuard] , children : [
    { path: "" , redirectTo: "overview" , pathMatch: "full"},
    { path: 'overview', loadChildren: () => import('./modules/overview/overview.module').then(m => m.OverviewModule) },
    { path: 'state', loadChildren: () => import('./modules/state/state.module').then(m => m.StateModule) },
    { path: 'projects/:id', loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule) },
    { path: 'chat', loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule) },
    { path: 'calendar', loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule) },
    { path: 'settings', loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) },
    { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
