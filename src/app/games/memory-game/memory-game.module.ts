import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoryGameRoutingModule } from './memory-game-routing.module';
import { MemoryGameComponent } from './memory-game.component';
import { CardComponent } from 'src/app/utilities/card/card.component';
import { FormComponent } from 'src/app/utilities/form/form.component';
import { CardModule } from 'src/app/utilities/card/card.module';


@NgModule({
  declarations: [
    MemoryGameComponent,
  ],
  imports: [
    CommonModule,
    MemoryGameRoutingModule,
    CardModule,
  ],
  exports: []
})
export class MemoryGameModule { }
