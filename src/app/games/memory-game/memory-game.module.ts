import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoryGameRoutingModule } from './memory-game-routing.module';
import { MemoryGameComponent } from './memory-game.component';
import { CardModule } from 'src/app/utilities/card/card.module';


@NgModule({
  declarations: [
    MemoryGameComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    MemoryGameRoutingModule,
  ],
  exports: [
    MemoryGameComponent
  ]
})
export class MemoryGameModule { }
