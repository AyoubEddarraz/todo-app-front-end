import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// SDK
import { DragDropModule } from '@angular/cdk/drag-drop';

const material:any = [
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatInputModule,
  MatFormFieldModule,
  DragDropModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
