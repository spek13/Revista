import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { ServiceService } from '../../service/service.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user = {
    username:'',
    email:'',
    password:'',
    type:null,
    status:null
  }
  constructor(
    private route:Router,
    private http:HttpClient,
    private service:ServiceService
  ) { }

  ngOnInit() {
  }


  store(){
    this.user.type = 0
    this.user.status = false
    this.service.registro(this.user).subscribe(data =>{
      // console.log(data)
      this.route.navigate(['/login'])
    },(erro => {
      // console.log(erro)
    }));
  }

}
