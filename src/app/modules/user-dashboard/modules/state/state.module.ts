import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateRoutingModule } from './state-routing.module';
import { StateComponent } from './state.component';

// Lotties
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { DependencyModule } from 'src/app/common/modules/dependency.module';
import { MaterialModule } from 'src/app/common/modules/material.module';
import { SharedComponentsModule } from 'src/app/common/modules/shared-components.module';
import { SharedLibrariesModule } from 'src/app/common/modules/shared-libraries.module';

export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    StateComponent
  ],
  imports: [
    CommonModule,
    StateRoutingModule,

    DependencyModule, // all Dependency of app
    MaterialModule, // material ui Components
    SharedComponentsModule, // all shared components
    SharedLibrariesModule, // all shared libraries

    LottieModule.forRoot({ player: playerFactory })

  ]
})
export class StateModule { }
