export const enum EventType {
	EVENT_NOTIFICATION = 'EVENT_NOTIFICATION',
};

export interface Event {
	readonly eventType: EventType;
}

export abstract class EventNotification implements Event {

	public eventType: EventType;
	public title: string;
	public message: string;
    public typeNotification: string;

	constructor( e: EventType, t: string, m: string, tn: string ){
		this.eventType = e;
		this.title = t;
		this.message = m;
        this.typeNotification = tn;
	}
}

export class EventNotificationInfo extends EventNotification{
	constructor( t: string, m: string, tn: string ){
		super( EventType.EVENT_NOTIFICATION, t, m, tn );
	}
}