import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';
import { DependencyModule } from 'src/app/common/modules/dependency.module';
import { MaterialModule } from 'src/app/common/modules/material.module';
import { SharedComponentsModule } from 'src/app/common/modules/shared-components.module';
import { SharedLibrariesModule } from 'src/app/common/modules/shared-libraries.module';


@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,

    DependencyModule, // all Dependency of app
    MaterialModule, // material ui Components
    SharedComponentsModule, // all shared components
    SharedLibrariesModule, // all shared libraries
  ]
})
export class OverviewModule { }
