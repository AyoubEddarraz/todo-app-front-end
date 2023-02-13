import { NgModule } from '@angular/core';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

const sharedLibraries: any = [
  LoadingBarHttpClientModule,
]

@NgModule({
  imports: [sharedLibraries],
  exports: [sharedLibraries]
})
export class SharedLibrariesModule { }
