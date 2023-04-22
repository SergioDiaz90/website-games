import { Component, Input, OnInit } from '@angular/core';
import { EventType } from 'src/app/_interface/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private eventServices: EventService
  ) { }

  actionInit: string = '';
  notificationInit: boolean = false;
  dataMessage: any = {};

  ngOnInit(): void {
    this.eventServices.subscribe( EventType.EVENT_NOTIFICATION, this.handlerCardNotification.bind( this ))
  }

  private handlerCardNotification ( e:EventType ) {
    this.notificationInit = !this.notificationInit;
    this.dataMessage = e;

    setTimeout(() => this.notificationInit = !this.notificationInit , 1000 );
  }



}
