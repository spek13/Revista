import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ServiceService } from '../../service/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-lector',
  templateUrl: './lector.component.html',
  styleUrls: ['./lector.component.css']
})
export class LectorComponent implements OnInit {

  urlApi = 'https://back-end-magazine.herokuapp.com';

  paused = true;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  public faqs:any = []
  public searchText;
  public searching:boolean = false;

  @ViewChild('carousel', {static : true}) 
  carousel: NgbCarousel; 

  revistas:any = []
  headImg:Array<any> =  []
  constructor(
    private route:Router,
    private http:HttpClient,
    private service:ServiceService,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.headImg = []
    this.revistasPublic()
  }

  revistasPublic(){
    this.service.getRevistasPublic().subscribe(data => {
      this.revistas = data
      //this.imageHead(this.revistas)
      // console.log(this.revistas)
    },erro => {

    });
  }

  verRevista(id){
    // console.log(this.headImg)
    this.route.navigate(['/revista/'+ 'public' + '/' +id])
  }

  // imageHead(revista){
  //   revista.forEach((element,index) => {
  //     this.service.getVerRevistaPublic(element.id).subscribe(data => {
  //       // this.headImg.push(data.length)
  //       // console.log(data)
  //       if (data.length > 0){
  //         // // console.log(element.id + data[0].image)
  //         this.headImg.push(data[0].image)
  //       }else{
  //         this.headImg.push("-")
  //       }
  //     })
  //   });

  // }

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

  public showSearchResults(event: any): void {
    if (event.target.value.length >= 3) {
      this.searching = true;
    } else {
      this.searching = false;
    }
  }

}
