import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-modulo2',
  templateUrl: './modulo2.component.html',
  styleUrls: ['./modulo2.component.scss']
})
export class Modulo2Component implements OnInit {

  menuHeader: Boolean = false
  images: any = []
  cards: any = []
  background1: any = '/assets/img/modulo2/Grupo%201656.svg'
  background2: any = '/assets/img/modulo2/Grupo%201641.png'
  background3: any = '/assets/img/modulo2/yevveq.png'

  gallery: any = [
    '/assets/img/modulo2/Grupo%201656.svg',
    '/assets/img/modulo2/Grupo%201641.png',
    '/assets/img/modulo2/yevveq.png',    
    '/assets/img/modulo2/Grupo%201647.png',
    '/assets/img/modulo2/Grupo%201645.png',
    '/assets/img/modulo2/Grupo%201649.png'
  ]

  gallery2: any = [    
    '/assets/img/modulo2/Grupo%201641.png',
    '/assets/img/modulo2/yevveq.png',
    '/assets/img/modulo2/Grupo%201647.png',
    '/assets/img/modulo2/Grupo%201645.png',
    '/assets/img/modulo2/Grupo%201649.png'
  ]


  @ViewChild(NzCarouselComponent, { static: false }) myCarousel: NzCarouselComponent;

  constructor() {
    this.images = [
      '/assets/img/modulo2/mOTENp@2x.png',
      '/assets/img/modulo2/K7OPmr@2x.png',
      '/assets/img/modulo2/QXR12S@2x.png',
      '/assets/img/modulo2/rhVfRd@2x.png',     
    ]

    this.cards = [
      {
        image : '/assets/img/modulo2/Grupo%201528.svg',
        text : 'Oportunidad de desarrollo'
      },
      {
        image: '/assets/img/modulo2/Grupo%201530.svg',
        text: 'En directo'
      },
      {
        image: '/assets/img/modulo2/Grupo%201531.svg',
        text: 'Biométricos'
      },
      {
        image: '/assets/img/modulo2/Grupo%201530.svg',
        text: 'Programación SUM'
      },
      {
        image: '/assets/img/modulo2/Grupo%201528.svg',
        text: 'Seguridad y Salud laboral'
      }
    ]

   }

  ngOnInit(): void {
  }

  toogleMenu() {
    this.menuHeader = this.menuHeader ? false : true
  }

  carouselAction(orientation) {
    if (orientation === 'left') {
      this.myCarousel.pre()
    } else {
      this.myCarousel.next()
    }
  }

}
