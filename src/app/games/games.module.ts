import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { MemoryGameModule } from './memory-game/memory-game.module';
import { GamesRoutingModule } from './game-routing.module';



@NgModule({
  declarations: [
    GamesComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MemoryGameModule
  ],
  exports: [
    GamesComponent
  ]
})
export class GamesModule { }
