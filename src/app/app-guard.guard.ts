import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  constructor (
    private sessionService: SessionService,
    private router: Router
  ) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let auth = this.sessionService.isActive(); 
    
    if ( auth ) {
      return auth
    } else {
      this.router.navigate(['']);
      return auth;
    }

  }
  
}
