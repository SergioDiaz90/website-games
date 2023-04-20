import { Component, Input, NgModule, OnInit, ViewChild } from '@angular/core';
import { dataCardWithGameMemory } from 'src/app/_interface/common';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent implements OnInit {

  constructor() { }

  @Input() use : string = '';
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() showOverlay: boolean = false;
  @Input() numberId: number | undefined;
  @Input() uuid: string = '';
  @Input() typeCard: string = '';
  @Input() typeForm: string = '';

  async ngOnInit() {
    this.handlerTimeOutForOverlay ();
  }

  private handlerTimeOutForOverlay () {
    setTimeout(() => {
      this.showOverlay = true;
    }, 1000 );
  }

}
