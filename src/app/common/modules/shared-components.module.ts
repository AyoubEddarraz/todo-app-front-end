import { NgModule } from '@angular/core';
import { CommingSoonComponent } from 'src/app/components/comming-soon/comming-soon.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { SideMenuComponent } from 'src/app/components/side-menu/side-menu.component';
import { DependencyModule } from './dependency.module';
import { MaterialModule } from './material.module';
import { SettingsItemComponent } from '../../components/settings-item/settings-item.component';

const sharedComponents: any = [
  HeaderComponent,
  SideMenuComponent,
  CommingSoonComponent,
  MenuComponent,
  SettingsItemComponent,
]

@NgModule({
  declarations: [sharedComponents],
  imports: [
    MaterialModule,
    DependencyModule
  ],
  exports: [sharedComponents]
})
export class SharedComponentsModule { }
