import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { FormModule } from '../form/form.module';



@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    FormModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
