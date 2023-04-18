import { Component, Input, OnInit } from '@angular/core';
import { dataCardWithGameMemory } from 'src/app/_interface/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input() dataCard : dataCardWithGameMemory | undefined;
  image: string = '';
  title: string = '';

  ngOnInit(): void {
    this.handlerDataForCards();
  }

  private handlerDataForCards () {
    if ( this.dataCard ) {
      this.image = this.dataCard.fields?.image.url
      this.title = this.dataCard.fields?.image.title
    }
    console.log('handlerDataForCards', this.dataCard)
  }



}
