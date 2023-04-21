import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './games.component';

const routes: Routes = [{
  path: '',
  component: GamesComponent,
  children: [
    {
      path: 'memory',
      loadChildren: () => import('./memory-game/memory-game.module').then((m) => m.MemoryGameModule ),
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
