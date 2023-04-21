import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as  slider from '../../../assets/content.json'
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})


export class SliderComponent implements OnInit {
  @ViewChild('selected') selected: ElementRef | undefined;
  private slider: any;
  private interval: Observable<number> = interval( 7000 );
  private cnt: number = 0;
  private cntPx: number = 0;
  public sliderData = slider

  constructor(
    private render: Renderer2,
    private elementRef: ElementRef
  ){ }

  ngOnInit(): void {
    console.log( 'slider', this.selected );
    this.start();
  }

  start () {
    this.move = this.move.bind(this);
    this.slider= this.elementRef.nativeElement.querySelector('.slider-content');
    this.interval.subscribe(() => this.move() )
  }

  move () {
      let items = this.sliderData.slider.length;
      
      console.log( 'move', this.cnt, items );
      this.cnt += 1;

      if (this.cnt >= items) {
          this.cnt = 0;
      } else {
          this.slider.style.transition = 'all 0.3s';
      }

      this.moveTo(this.cnt);
  }

  moveTo (idx: number) {
      if ( idx === 0 ) {
        this.cntPx = 0;
      } else {
        this.cntPx += 99;
      }

      this.slider.style.top = `-${ this.cntPx }%`;
  }

}


