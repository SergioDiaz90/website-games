import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

	constructor() { }

	public insert ( key: string, value:any ){
		let val:string = JSON.stringify( value );
		localStorage.setItem( key, val);
	}

	public select ( key: string ){
		let item:any = localStorage.getItem( key );
		return item? JSON.parse( item ): null;
	}

	public remove ( key: string ){
		return localStorage.removeItem( key );
	}
}
