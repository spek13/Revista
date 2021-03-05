import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ServiceService } from '../../service/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Img } from './img';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-revista',
  templateUrl: './revista.component.html',
  styleUrls: ['./revista.component.css']
})
export class RevistaComponent implements OnInit {

  urlApi = 'https://back-end-magazine.herokuapp.com';

  revistaId:any
  revistaType:any
  paginas:any = []

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
 
  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  @ViewChild('carousel', {static : true}) 
  carousel: NgbCarousel;  

  constructor(
    private route:Router,
    private http:HttpClient,
    private service:ServiceService,
    private fb:FormBuilder,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.togglePaused();
    this.revistaId = this.activatedRoute.snapshot.params['id'];
    this.revistaType = this.activatedRoute.snapshot.params['type']
    // console.log(this.revistaId)
    // console.log(this.revistaType)
    switch (this.revistaType) {
      case 'privado':
          this.getContenido();
        break;
      case 'public':
          this.getContenidoPublic()
        break;
      default:
        break;
    }
  }

  getContenido(){
    this.service.getRevista(this.revistaId).subscribe( data =>{
      this.paginas = data;
      // console.log(this.paginas)
    }, erro => {
      this.route.navigate(['/lector'])
    })

  }

  getContenidoPublic(){
    this.service.getVerRevistaPublic(this.revistaId).subscribe(data =>{
      this.paginas = data;
      // console.log(this.paginas)
      if ( data.message == 'No successful' ){
        this.route.navigate(['/lector'])
      }
    },erro => {
      
    })
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
