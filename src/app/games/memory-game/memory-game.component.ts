import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RequestService } from 'src/app/services/request.service';
import { dataCardWithGameMemory } from 'src/app/_interface/common';
import { SessionService } from 'src/app/services/session.service';
import { EventService } from 'src/app/services/event.service';
import { EventNotification, EventNotificationInfo } from 'src/app/_interface/event';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {
  public dataGame: dataCardWithGameMemory | any;
  public scoreGame = {
    success: 0,
    mistakes: 0
  }
  private foundPairs: any = [];

  private selections: any = {
    first: {
      id: undefined,
      title: '',
      uuid: undefined,
      full: false,
      reference: ''
    },
    second: {
      id: undefined,
      title: '',
      uuid: undefined,
      full: false,
      reference: ''
    }
  }

  constructor(
    private requestService: RequestService,
    private render: Renderer2,
    private sessionService: SessionService,
    private eventService: EventService
  ) { }

  async ngOnInit() {
    await this.getDataCards();
  }

  private async getDataCards () {
    let temporalRequest: any = await this.requestService.request( 'get', environment.urlGames.memory, {}, null, {})
    let limitData: number = 40;

    if ( !this.dataGame ) {
      this.dataGame = temporalRequest;
    }

    if ( this.dataGame.entries.length < limitData ) {
      this.dataGame.entries.push( ...temporalRequest?.entries );
    }

    if ( this.dataGame.entries.length < limitData ) {
      this.getDataCards();
    } else {
      this.dataGame.entries.sort(() => Math.random() - 0.5 );
      return
    }

  }

  private searchImgInCard ( childNodes: any ) {
    return [ ...childNodes ]
      .find( node => node.className === 'card-img--wrapper').firstChild;
  }

  private addClassForHiddenCard ( objs: any ){
    for (let idx in objs ) {
      this.render.removeClass( objs[idx].reference, 'show' ); 
    }
  }

  private async saveScoreInUser () {
    let session = this.sessionService.get()
    session = await this.sessionService.readLocalStorageData( session );

    if ( !session?.games?.memory ) {

      session = { ...session,
        games: {
          memory: [ this.scoreGame ], 
        }
      }
    } else {
      session.games.memory.push( this.scoreGame );
    }
    
    return await this.sessionService.writeLocalStorageData( session );
  }

  private reloadGame () {
    this.eventService.broadcast( new EventNotificationInfo (
      'Felicidadaes',
      'Has ganado esta partida',
      'success'
    ))

    this.handlerShowOverlayCardAndReloadSelection( false , true , undefined, true );
    this.scoreGame.success = 0;
    this.scoreGame.mistakes = 0;
    this.foundPairs = [];
  }

  private async handlerScoreGame () {

    if ( this.selections.first.title === this.selections.second.title ) {
      this.scoreGame.success += 1;
      let copy = { ...this.selections }
      this.foundPairs.push(copy);
      this.handlerShowOverlayCardAndReloadSelection( true , true );
    }


    if ( this.selections.first.title !== this.selections.second.title ) {
      this.scoreGame.mistakes += 1;

      setTimeout(() => {
        this.handlerShowOverlayCardAndReloadSelection( false , true );
      }, 1000 );
    }

    if ( this.scoreGame.success === this.dataGame.entries.length / 2 ) { // review error in async change success
      if (await this.saveScoreInUser()) {
        this.reloadGame();
        return
      }
    }
  }

  private handlerShowOverlayCardAndReloadSelection (
      show: boolean, clear: boolean = false,
      reference: any = undefined, refresh: boolean = false
    ) {

    if ( show && reference ) {
      this.render.addClass( reference, 'show' );
    }

    if ( !show && !refresh ) {
      this.addClassForHiddenCard( this.selections );
    }
    
    if ( refresh ) {
      this.foundPairs.map((obj: any) => {
        this.addClassForHiddenCard( obj );
      })
    }

    if ( clear ) {
      this.selections.first = {};
      this.selections.second = {};
    }

  }

  private handlerNoRepeatSelection ( title: string ): any {
    if ( this.scoreGame.success !== 0 ) {
      let result = this.foundPairs.filter((elm: { first: { title: string; }; second: { title: any; }; }) => elm.first.title === title || elm.second.title === title );
      return result.length > 0 ? true : false;
    }
    
    if ( this.scoreGame.success === 0 ) {
      return false
    }

  }
  public handlerSelectionCard ( e: any ) {
    e.preventDefault();

    let handlingEvent: any = {
      id: 0,
      title: '',
      uuid: undefined,
      full: false
    };

    let tmp = this.searchImgInCard(e.target.offsetParent.childNodes);
    let title = tmp.getAttribute('alt');
    let repeatCard = this.handlerNoRepeatSelection( title );

    if ( !repeatCard ) {
      handlingEvent.title = title;
      handlingEvent.id = e.target.offsetParent.getAttribute('id');
      handlingEvent.uuid = tmp.getAttribute('name');
      handlingEvent.full = true;
      handlingEvent.reference = e.target;
      this.handlerShowOverlayCardAndReloadSelection( true, false, handlingEvent.reference );
    } else {
      this.handlerShowOverlayCardAndReloadSelection( true, true );
      return
    }

    if ( !this.selections.first.full ) {
      this.selections.first = handlingEvent
      this.selections.first.key = 'first'
    } else {
      this.selections.second = handlingEvent;
      this.selections.second.key = 'second'
    }
    
    if ( this.selections.first.full && this.selections.second.full ) {
      this.handlerScoreGame();
    }
  }

}
