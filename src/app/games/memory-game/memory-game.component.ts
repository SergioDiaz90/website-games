import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RequestService } from 'src/app/services/request.service';
import { dataCardWithGameMemory } from 'src/app/_interface/common';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {
  public dataGame: dataCardWithGameMemory | any;
  private scoreGame = {
    success: 0,
    mistakes: 0
  }
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
    private render: Renderer2
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

  private handlerScoreGame () {
    if ( this.selections.first.title === this.selections.second.title ) {
      this.scoreGame.success += 1;
    }

    if ( this.selections.first.title !== this.selections.second.title ) {
      this.scoreGame.mistakes += 1;

      setTimeout(() => {
        this.handlerShowOverlayCardAndReloadSelection( false );
      }, 1000 );
    }

    console.log('handlerScoreGame', this.scoreGame );
  }

  private handlerShowOverlayCardAndReloadSelection ( show: boolean , reference: any = undefined ) {
    if ( show && reference ) {
      this.render.removeClass( reference, 'card-bg--hidden' );
    }

    if ( !show ) {
      for (let idx in this.selections ) {
        this.render.addClass( this.selections[idx].reference, 'card-bg--hidden' );
      }

      this.selections.first = {};
      this.selections.second = {};
    }

  }

  public handlerSelectionCard ( e: any ) {

    let handlingEvent: any = {
      id: 0,
      title: '',
      uuid: undefined,
      full: false
    };

    let tmp = undefined;

    tmp = this.searchImgInCard(e.target.offsetParent.childNodes);
    handlingEvent.reference = e.target;
    handlingEvent.id = e.target.offsetParent.getAttribute('id');
    handlingEvent.title = tmp.getAttribute('alt');
    handlingEvent.uuid = tmp.getAttribute('name');
    handlingEvent.full = true;
    this.handlerShowOverlayCardAndReloadSelection( true, handlingEvent.reference );

    if ( !this.selections.first.full ) {
      this.selections.first = handlingEvent
    } else {
      this.selections.second = handlingEvent;
    }
    
    if ( this.selections.first.full && this.selections.second.full ) {
      this.handlerScoreGame();
    }
  }



}
