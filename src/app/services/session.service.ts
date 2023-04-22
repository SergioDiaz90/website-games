import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	private static readonly STORAGE_KEY:string = 'session';
	public session_data: any;

	constructor(
		private sessionStorage: SessionStorageService,
		private localStorage: LocalStorageService,
	) {
		this.init();
	}



	public async readSessionStorageData (): Promise<boolean> {
		let session = this.sessionStorage.select( SessionService.STORAGE_KEY );
		if ( session === null ) {
			return Promise.reject( false );
		}
		try{
			let tmp = JSON.parse( session );
			this.session_data = tmp;
			return Promise.resolve( true );
		} catch ( error ) {
			this.end();
			return Promise.reject( false );
		}
	}


	public async writeSessionStorageData ( data: any ): Promise<boolean>  {
		let message = JSON.stringify( data );
		try {
			this.session_data = data;
			this.sessionStorage.insert( SessionService.STORAGE_KEY, message );
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async readLocalStorageData ( data: any ): Promise<boolean> {
		let session = this.localStorage.select( data.name );
		if ( session === null ) {
			return Promise.reject( false );
		}
		
		try{
			let tmp = JSON.parse( session );
			this.session_data = tmp;
			return this.session_data;
		} catch ( error ) {
			return Promise.reject( false );
		}
	}

	public async writeLocalStorageData ( data: any ): Promise<boolean>  {
		let message = JSON.stringify( data );
		try {
			this.session_data = data;
			this.localStorage.insert( data.name, message );
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public get (){
		return this.session_data;
	}

	public isActive(){
		this.readSessionStorageData();
		return this.session_data !== null;
	}

	public end (){
		this.session_data = null;
		this.sessionStorage.remove( SessionService.STORAGE_KEY );
		// this.broadcastToggleSession();
	}

	private init() {
		this.session_data = null;
	}

}
