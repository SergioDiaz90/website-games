import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'src/app/utilities/button/button.module';
import { HomeComponent } from './home.component';
import { CardModule } from 'src/app/utilities/card/card.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
