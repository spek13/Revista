import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ServiceService } from '../../service/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Img } from './img'

@Component({
  selector: 'app-escritor',
  templateUrl: './escritor.component.html',
  styleUrls: ['./escritor.component.css']
})
export class EscritorComponent implements OnInit {

  urlApi = 'https://back-end-magazine.herokuapp.com';

  revistas:any = [];
  users:any = [];
  userId:any;
  userName:any;
  userType = localStorage.getItem('userType');

  nameRevista:any;
  contenidoImage:any = []

  dataImg:any;
  headImg:Array<any> = []
  testImg = {
    name:null,
    description:null,
    image:null,
    magazine_id:null
  }

  user = {
    status:null
  }
  contenido: FormGroup;

  revista = {
    name:null,
    description:null,
  }

  magazineId:any;

  private revistaId:any;
  private myFIle = null;
  private imagePath:File = null;
  private imgURL = null;

  constructor(
    private route:Router,
    private http:HttpClient,
    private service:ServiceService,
    private fb:FormBuilder
  ) {  }

  ngOnInit() {
    // this.userType = localStorage.getItem('userType');
    // this.revistaUser()
    this.nameRevista = null
    this.contenidoImage = []

    this.dataImg = new Img();
    this.value()
    this.contenido = this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required],
      image:['',Validators.required],
      magazine_id:['',Validators.required]
    });
    // this.dataImg = new Img();
  // this.headImg = []
  // console.log(this.headImg)
  this.userType = localStorage.getItem('userType');
  this.revistaUser()
  // this.imageHead()
  }

  // imageHead(revista){
  //   revista.forEach((element,index) => {
  //     this.service.getRevista(element.id).subscribe(data => {
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

  value(){
    if (localStorage.length == 0){
      this.route.navigate(['/lector'])
    }
  }

  test(id, name){
    this.revistaId = id;
    this.nameRevista = name;
    //this.contenido.value.magazine_id = this.revistaId;
    this.contenido.get('magazine_id').setValue(this.revistaId)
    this.verContenido()

  }

  setMagazineId(id){
    this.magazineId = id;
  }

  revistaUser(){
    switch (this.userType) {
      case '0':
        this.service.revistaUser(localStorage.getItem('userID')).subscribe(data =>{
          this.revistas = data
          // this.imageHead(this.revistas)
          // console.log(this.revistas)
        },erro => {
          // console.log(erro)
        });
        break;
      
      case '1':
        this.service.getRevistaAll().subscribe(data => {
          this.revistas = data
          // this.imageHead(this.revistas)
        });
        this.getAllUser();
        break;
        
      default:
        break;
    }
  }

  createRevista(){
    if (this.revista.name != null && this.revista.description != null){
      this.service.crearRevista(this.revista).subscribe(data => {
      this.revista.name = null
      this.revista.description =null
      // console.log(data)
      this.ngOnInit()
    },erro => {
      // console.log(erro)
    });
    }else{
      alert('Llene todo los campos.')
    }
    this.ngOnInit()
  }

  deleteRevista(id){
    this.service.eliminarRevista(id).subscribe(data => {
      this.ngOnInit()
    })
  }

  uploadFile:File = null
  totalImge = 0
  selectFile(e){
    // // console.log(e)
    this.totalImge = e.target.files.length
    this.uploadFile = <File> e.target.files
    
    // // console.log(this.uploadFile)
    // console.log(this.headImg)
  }

  agregarContenido(){
    // console.log(this.testImg)


    for (let index = 0; index < this.totalImge; index++) {

      console.log("NAME FILE: " + this.uploadFile[index].name)
      var portada = this.uploadFile[index].name.split(".")
      if (portada[0] == "portada") {
        let magazine = new FormData()
        magazine.append('portada',this.uploadFile[index]);
        this.service.updatePortada(magazine,this.revistaId).subscribe(data => {
          console.log("[DATA MA]" + data)
        },(erro =>{
          console.log("[UPDPOrtada]" + erro)
        }))
      }

      let imgMa = new FormData()
      this.dataImg.image = this.uploadFile[index]
      // console.log(this.dataImg.image.name)
      imgMa.append('image',this.dataImg.image,this.dataImg.image.name)
      imgMa.append('magazine_id',this.revistaId)
      imgMa.append('name',this.dataImg.name)
      imgMa.append('description',this.dataImg.description)
      

      this.service.crearImagenesRevista(imgMa).subscribe(data =>{
        // // console.log(data);
        this.ngOnInit()
      },erro =>{
        console.log("[ErrroCARImga]",erro)
      })
      // // console.log(index)
    }    
      this.ngOnInit();
      // // console.log(this.contenido.value)
    
  }

  verImage(id){

    this.route.navigate(['/revista' + '/privado' + '/' +id])
  }

  verContenido(){
    this.service.getRevista(this.revistaId).subscribe(data => {
      this.contenidoImage = data
      // console.log(this.contenidoImage)
    });
  }

  deleteImage(id){
    this.service.eliminarImage(id).subscribe(data => {
      this.verContenido()
    })
  }

  publicarRevista(id, name){
    this.service.publicarRevista(id,this.revista).subscribe(data =>{
      alert( name + ' Publicado' )
      this.ngOnInit()
    },erro =>{
      // console.log(erro)
    });
    this.ngOnInit()
  }

  noPublicarRevista(id, name){
    this.service.noPublicarRevista(this.revista,id).subscribe(data =>{
      alert( name + ' Descontinuado' )
      this.ngOnInit()
    },erro =>{
      // console.log(erro)
    });
    this.ngOnInit()
  }

  getAllUser(){
    this.service.getUserAll().subscribe(data => {
      this.users = data;
    },erro => {

    })
  }

  deshabilitarUser(id){
    this.user.status = false;
    this.service.editarUser(this.user,id).subscribe( data=> {
      this.getAllUser()
    },erro => {
    })
  }

  habilitarUser(id){
    this.user.status = true;
    this.service.editarUser(this.user,id).subscribe( data=> {
      this.getAllUser()
    },erro => {
    })
  }

  deleteUser(id){
    console.log(id)
    this.service.deleteUser(id).subscribe( data => {
      console.log(data)
      this.getAllUser()
    },erro => {
      console.log(erro)
    })
  }

  setUserId(id,userName){
    this.userId = id;
    this.userName = userName
  }

  cerrarSesion(){
    localStorage.clear();
    this.route.navigate(['/lector'])
  }

}
