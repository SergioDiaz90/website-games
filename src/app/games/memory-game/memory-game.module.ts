import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoryGameRoutingModule } from './memory-game-routing.module';
import { MemoryGameComponent } from './memory-game.component';
import { CardComponent } from 'src/app/utilities/card/card.component';


@NgModule({
  declarations: [
    MemoryGameComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MemoryGameRoutingModule
  ]
})
export class MemoryGameModule { }
