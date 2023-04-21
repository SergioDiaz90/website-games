import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  actionInit: string = '';
  isActive: boolean = false;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isActive = this.sessionService.isActive();
  }
  
  ngAfterViewInit () {
    console.log('isActive', this.isActive);
  }

  public navigateTo( route: string ) {
    this.router.navigate([`games/${ route }`])
  }

  public logOut () {
    this.sessionService.end()
    this.router.navigate([''])
  }

}
