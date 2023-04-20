import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent,
  },
  {
    path:"memory",
    loadChildren: () => import('./games/memory-game/memory-game.module').then((m) => m.MemoryGameModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
