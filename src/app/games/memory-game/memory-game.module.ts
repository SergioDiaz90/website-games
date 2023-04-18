import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoryGameRoutingModule } from './memory-game-routing.module';
import { MemoryGameComponent } from './memory-game.component';


@NgModule({
  declarations: [
    MemoryGameComponent
  ],
  imports: [
    CommonModule,
    MemoryGameRoutingModule
  ]
})
export class MemoryGameModule { }
