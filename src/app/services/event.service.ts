import { EventEmitter, Injectable } from '@angular/core';
import { EventType } from '../_interface/event';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private routerEvents: any;
	private events: any;
	public scroll: boolean = false;

	constructor(
	) {
		this.events = {};
	}


	private getEmitter( et:EventType ){
		let emitter = this.events[ et ];
		if( !emitter ){
			emitter = new EventEmitter<Event>( true );
			this.events[ et ] = emitter;
		}
		return emitter;
	}


	public subscribe( et: EventType, next:any ): Subscription {
		let emitter = this.getEmitter( et );
		return emitter.subscribe( next );
	}


	public broadcast( e: Event | any ){
		console.log(e);
		let emitter = this.getEmitter( e.eventType );
		emitter.emit( e );
	}

}
