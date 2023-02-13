import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { DependencyModule } from 'src/app/common/modules/dependency.module';
import { MaterialModule } from 'src/app/common/modules/material.module';
import { SharedComponentsModule } from 'src/app/common/modules/shared-components.module';
import { SharedLibrariesModule } from 'src/app/common/modules/shared-libraries.module';


@NgModule({
  declarations: [
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,

    DependencyModule, // all Dependency of app
    MaterialModule, // material ui Components
    SharedComponentsModule, // all shared components
    SharedLibrariesModule, // all shared libraries
  ]
})
export class UserDashboardModule { }
