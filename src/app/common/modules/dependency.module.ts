import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const dependency:any = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule
]

@NgModule({
  imports: [dependency],
  exports: [dependency]
})
export class DependencyModule { }
