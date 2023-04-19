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
      let copy = { ...this.selections }
      this.scoreGame.success += 1;
      this.foundPairs.push(copy);
    }

    if ( this.selections.first.title !== this.selections.second.title ) {
      this.scoreGame.mistakes += 1;

      setTimeout(() => {
        this.handlerShowOverlayCardAndReloadSelection( false , true );
      }, 1000 );
    }

    console.log('handlerScoreGame', this.scoreGame );
  }

  private handlerShowOverlayCardAndReloadSelection ( show: boolean, clear: boolean = false, reference: any = undefined ) {

    if ( show && reference ) {
      this.render.removeClass( reference, 'card-bg--hidden' );
    }

    if ( !show ) {
      for (let idx in this.selections ) {
        this.render.addClass( this.selections[idx].reference, 'card-bg--hidden' );
      }
    }

    if ( clear ) {
      this.selections.first = {};
      this.selections.second = {};
    }

  }

  private handlerNoRepeatSelection ( title: string ): any {
    if ( this.scoreGame.success !== 0 ) {
      let result = this.foundPairs.filter((elm: { first: { title: string; }; second: { title: any; }; }) => elm.first.title === title || elm.second.title === title );
      console.log('result', result )
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
      console.log('handlingEvent', handlingEvent );
    } else {
      console.log('esta carta esta repetida')
      this.handlerShowOverlayCardAndReloadSelection( true, true );
      return
    }

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
