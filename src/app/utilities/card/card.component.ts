import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { dataCardWithGameMemory } from 'src/app/_interface/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input() use : string = '';
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() showOverlay: boolean = true;
  @Input() numberId: number | undefined;
  @Input() uuid: string = '';

  async ngOnInit() {}

}
