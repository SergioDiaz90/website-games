import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { MemoryGameModule } from './memory-game/memory-game.module';
import { GamesRoutingModule } from './game-routing.module';
import { NavBarModule } from '../utilities/nav-bar/nav-bar.module';
import { CardModule } from '../utilities/card/card.module';



@NgModule({
  declarations: [
    GamesComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MemoryGameModule,
    NavBarModule,
    CardModule
  ],
  exports: [
    GamesComponent
  ]
})
export class GamesModule { }
