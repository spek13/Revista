import { Component, OnInit } from '@angular/core';

import { FormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { ServiceService } from '../../service/service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email:'',
    password:''
  }

  constructor(
    private router:Router,
    private http:HttpClient,
    private service:ServiceService
  ) { }

  ngOnInit() {
    // this.active()
  }

  signIn(){
    this.service.login(this.user).subscribe(data =>{
      if (data == 500){
        alert('Correo electronico o contraseña incorrecto')
      }else{
        localStorage.setItem('userID',data.id)
        localStorage.setItem('token',data.token.token)
        localStorage.setItem('userType',data.type)
        // switch (data.type) {
        //   case 1:
        //     this.router.navigate(['/escritor'])
        //     break;
        //   case 2:
        //     this.router.navigate(['/publicador'])
        //     break;
        //   default:
        //     break;
        // }
        if(!data.status){
          alert('Su cuenta esta desactivada.\nComunícate con el admistrador.')
          return;
        }
        this.router.navigate(['/escritor'])
      }
    },(erro => {
      // console.log('ERRO =>' + erro)
    }));
  }

  active(){
    if (localStorage.getItem('token')){
      this.router.navigate(['/escritor'])
    }
  }
}
