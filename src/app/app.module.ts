import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemoryGameModule } from './games/memory-game/memory-game.module';
import { RequestService } from './services/request.service';
import { HomeComponent } from './views/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from './utilities/card/card.module';
import { FormModule } from './utilities/form/form.module';
import { ButtonModule } from './utilities/button/button.module';
import { HomeModule } from './views/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MemoryGameModule,
    CardModule,
    FormModule,
    ButtonModule,
    HomeModule
  ],
  providers: [ RequestService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
