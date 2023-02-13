import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { MaterialModule } from 'src/app/common/modules/material.module';
import { DependencyModule } from 'src/app/common/modules/dependency.module';
import { SharedComponentsModule } from 'src/app/common/modules/shared-components.module';
import { SharedLibrariesModule } from 'src/app/common/modules/shared-libraries.module';


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,

    DependencyModule, // all Dependency of app
    MaterialModule, // material ui Components
    SharedComponentsModule, // all shared components
    SharedLibrariesModule, // all shared libraries

  ]
})
export class AccountModule { }
