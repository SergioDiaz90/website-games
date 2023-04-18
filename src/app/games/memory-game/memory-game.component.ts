import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss']
})
export class MemoryGameComponent implements OnInit {

  private dataCards: any;

  constructor(
    private requestService: RequestService
  ) { }

  async ngOnInit() {
    await this.getDataCards();
  }

  private async getDataCards () {
    this.dataCards = await this.requestService.request( 'get', environment.urlGames.memory, {}, null, {})
  }

}
