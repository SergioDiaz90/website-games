import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AppGuard } from './app-guard.guard';

const routes: Routes = [
  {
    path:"",
    loadChildren: () => import('./views/home/home.module').then((m) => m.HomeModule )
  },
  {
    path:"games",
    loadChildren: () => import('./games/games.module').then((m) => m.GamesModule),
    canActivate: [AppGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
