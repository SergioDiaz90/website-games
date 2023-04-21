import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { EventType } from '../_interface/event';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  actionInit: string = '';
  notificationInit: boolean = false;
  dataMessage: any = {};
  
  constructor(
    private eventServices: EventService
  ) { }

  ngOnInit(): void {
    this.eventServices.subscribe( EventType.EVENT_NOTIFICATION, this.handlerCardNotification.bind( this ))
  }

  private handlerCardNotification ( e:EventType ) {
    this.notificationInit = !this.notificationInit;
    this.dataMessage = e;

    setTimeout(() => this.notificationInit = !this.notificationInit , 1000 );
  }
}
