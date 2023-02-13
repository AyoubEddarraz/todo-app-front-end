import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DependencyModule } from './common/modules/dependency.module';
import { MaterialModule } from './common/modules/material.module';
import { SharedComponentsModule } from './common/modules/shared-components.module';
import { SharedLibrariesModule } from './common/modules/shared-libraries.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './common/interceptor/jwt.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Lotties
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ErrorInterceptor } from './common/interceptor/error.interceptor';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    NotFoundComponent,
    ConfirmAccountComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    DependencyModule, // all Dependency of app
    MaterialModule, // material ui Components
    SharedComponentsModule, // all shared components
    SharedLibrariesModule, // all shared libraries

    LottieModule.forRoot({ player: playerFactory })


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
