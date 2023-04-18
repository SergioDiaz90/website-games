import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemoryGameModule } from './games/memory-game/memory-game.module';
import { RequestService } from './services/request.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MemoryGameModule,
    HttpClientModule
  ],
  providers: [ RequestService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
