import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-filtro-revista',
  templateUrl: './filtro-revista.component.html',
  styleUrls: ['./filtro-revista.component.css']
})
export class FiltroRevistaComponent implements OnInit {

  urlApi = 'https://back-end-magazine.herokuapp.com';


  revistaType:any;

  revistaBus:any;

  revistas:any = []
  headImg:Array<any> =  []
  
  flag = true;

  public faqs:any = []
  public searchText;
  public searching:boolean = false;

  constructor(
    private route:Router,
    private http:HttpClient,
    private service:ServiceService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.revistBuscar()
    this.flag = true;
    this.revistaType = this.activatedRoute.snapshot.params['type']
    this.tipoFiltro(this.revistaType);
  }

  tipoFiltro(revistaType){
    switch(revistaType){
      case 'recomendado':
        this.revistasMasVistas()
      break;
      case 'revistas':
        this.revistasPublic()
        break;

    }
  }

  revistBuscar(){
    this.service.getRevistasPublic().subscribe(data =>{
      this.revistaBus = data;
    });
  }

  revistasPublic(){
    this.service.getRevistasPublic().subscribe(data => {
      this.revistas = data
      //this.imageHead(this.revistas)
    },erro => {

    });
  }

  revistasMasVistas(){
    this.service.getRevistasPublic().subscribe(data => {
      this.revistas = data;
      this.imageHead(this.revistas)
    },erro => {

    });
  }

  imageHead(revista){
    revista.forEach((element,index) => {
      if (element.view >= 10) {
        this.headImg.push(element);
      }
    });
    this.revistas = this.headImg;
  }

  verRevista(id){
    // console.log(this.headImg)
    this.route.navigate(['/revista/'+ 'public' + '/' +id])
  }

  bandera(){
    if (this.flag){
      this.flag = false;
      return true;
    }
    this.flag = true;
    return false;
  }

  public showSearchResults(event: any): void {
    if (event.target.value.length >= 3) {
      this.searching = true;
    } else {
      this.searching = false;
    }
  }

}
