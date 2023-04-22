import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { ButtonModule } from '../button/button.module';
import { CardModule } from '../card/card.module';



@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule { }
