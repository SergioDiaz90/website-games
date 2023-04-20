import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private static readonly STORAGE_KEY:string = 'session';
	// private static readonly SECRET: any = ENVIRONMENT.SECRET;
	public session_data!: any;

	constructor(
		private sessionStorage: SessionStorageService,
    private localStorage: LocalStorageService,
		// private eventService: EventService,
		// private apiService: ApiService,
		// private cryptoService: CryptoService
	) {
		this.init();
	}



	public async read_session_storage_data (): Promise<boolean> {
		let session = this.sessionStorage.select( SessionService.STORAGE_KEY );
		if ( session === null ) {
			return Promise.reject( false );
		}
		try{
			// const res = await this.cryptoService.decrypt( session, SessionService.SECRET );
			let tmp = JSON.parse( session );

			this.session_data = tmp;
			this.broadcastToggleSession();
			return Promise.resolve( true );
		} catch ( error ) {
			this.end();
			return Promise.reject( false );
		}
	}


	public async write_session_storage_data ( data: any ): Promise<boolean>  {
		let message = JSON.stringify( data );
		try {
			// const res = await this.cryptoService.encrypt(message, SessionService.SECRET);
			this.session_data = data;

			this.sessionStorage.insert( SessionService.STORAGE_KEY, message );
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async read_local_storage_data ( data: any ): Promise<boolean> {
		let session = this.localStorage.select( data.name );
		if ( session === null ) {
			console.log('read_local_storage_data', session );
			return Promise.reject( false );
		}
		
		try{
			// const res = await this.cryptoService.decrypt( session, SessionService.SECRET );
			let tmp = JSON.parse( session );

			this.session_data = tmp;

			return this.session_data;
		} catch ( error ) {
			return Promise.reject( false );
		}
	}

  public async write_local_storage_data ( data: any ): Promise<boolean>  {
		let message = JSON.stringify( data );
		try {
			// const res = await this.cryptoService.encrypt(message, SessionService.SECRET);
			this.session_data = data;

			this.localStorage.insert( data.name, message );
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	private broadcastToggleSession() {
		let isSessionActive = this.isActive();
		// let event = new EventToggleSession( isSessionActive );
		// this.eventService.broadcast( event );
	}



	// public set_credentials ( credentials: any ): Promise<any> {
	// 	let storage = {
	// 		'credentials': credentials
	// 	};
	// 	return this.write_session_storage_data( storage ).then( res => {
	// 		return Promise.resolve( res );
	// 	}).catch( error => {
	// 			return Promise.resolve( error );
	// 	})
	// }

	// public set_credentials_sid ( sid: String ): Promise<any> {
	// 	let storage = {
	// 		'credentials': {
	// 			'x-hablame-sid' : sid,
	// 		},
	// 	};
	// 	return this.write_session_storage_data( storage ).then( res => {
	// 		return Promise.resolve( res );
	// 	}).catch( error => {
	// 			return Promise.resolve( error );
	// 	})
	// }

	// public set_credentials_api ( account: string, apikey:string, token:string ): Promise<any> {
	// 	let storage = {
	// 		'credentials': {
	// 			'account' : account,
	// 			'apikey': apikey,
	// 			'token': token
	// 		}
	// 	};
	// 	return this.write_session_storage_data( storage ).then( res => {
	// 		return Promise.resolve( res );
	// 	}).catch( error => {
	// 			return Promise.resolve( error );
	// 	})
	// }



	public get (){
		return this.session_data;
	}



	public isActive(){
		return this.session_data !== null;
	}



	public end (){
		this.session_data = null;
		this.sessionStorage.remove( SessionService.STORAGE_KEY );
		// this.broadcastToggleSession();
	}


	private init() {
		this.session_data = null;
		// this.broadcastToggleSession();
	}


}
