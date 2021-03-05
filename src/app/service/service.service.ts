import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, ObservedValueOf } from 'rxjs';
// import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  urlApi = 'https://back-end-magazine.herokuapp.com/api/v1';
  // urlApi = 'http://127.0.0.1:3333/api/v1'

  constructor( private http:HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptionsToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  //Inicio sesion
  public login(data:any):Observable<any>{
    return this.http.post<any>(this.urlApi+'/login',JSON.stringify(data),this.httpOptions)
  }

  //crear Usuario
  public registro(data:any):Observable<any>{
    return this.http.post<any>(this.urlApi+'/registro',JSON.stringify(data),this.httpOptions)
  }

  //obtener todos los usuarios
  public getUserAll():Observable<any>{//token
    return this.http.get<any>(this.urlApi+'/users',this.httpOptionsToken)
  }

  //editar a un solo usuario
  public editarUser(data:any, id:any):Observable<any>{//token
    return this.http.put<any>(this.urlApi+'/users/'+id,JSON.stringify(data),this.httpOptionsToken)
  }

  //eliminar usuario
  public deleteUser(id:any):Observable<any>{//token
    return this.http.delete<any>(this.urlApi+'/users/'+id,this.httpOptionsToken);
  }

  //obtener las revista del usuario(escritor) logeado
  public revistaUser(id:any):Observable<any>{//token
    return this.http.get<any>(this.urlApi+'/users/'+id,this.httpOptionsToken)
  }

  //Obtener el contenido de la revista
  public getRevista(id:any):Observable<any>{//token
    return this.http.get<any>(this.urlApi+'/magazines/'+id,this.httpOptionsToken)
  }

  //Obtener las revistas creadas por el usuario
  public getPreRevistas():Observable<any>{
    return this.http.get<any>(this.urlApi+'/pre-revistas',this.httpOptions)
  }

  public getRevistaAll():Observable<any>{
    return this.http.get<any>(this.urlApi+'/magazines',this.httpOptionsToken)
  }

  //Obtener las revistas publicas
  public getRevistasPublic():Observable<any>{
    return this.http.get<any>(this.urlApi+'/revistas',this.httpOptions)
  }

  //Obtener el contenido de la revista publicada
  public getVerRevistaPublic(id:any):Observable<any>{
    return this.http.get<any>(this.urlApi+'/ver-revista/'+id,this.httpOptions)
  }

  //Crear una revista del usuario(escritor)
  public crearRevista(data:any):Observable<any>{//token
    return this.http.post<any>(this.urlApi+'/magazines',JSON.stringify(data),this.httpOptionsToken)
  }

  //Editar revista, no edita el contenido(imagenes)
  public editarRevista(data:any,id:any):Observable<any>{//token
    return this.http.put<any>(this.urlApi+'/magazines/'+id,JSON.stringify(data),this.httpOptions)
  }

  //Eliminar revista
  public eliminarRevista(id:any):Observable<any>{//token
    return this.http.delete<any>(this.urlApi+'/magazines/'+id,this.httpOptionsToken)
  }

  //Eliminar imagen
  public eliminarImage(id:any):Observable<any>{//token
    return this.http.delete<any>(this.urlApi+'/images/'+id,this.httpOptionsToken);
  }

  //Cambiar el status de la resvitar de ser privado a publico
  public publicarRevista(id:any,data:any):Observable<any>{//token
    return this.http.put<any>(this.urlApi+'/publicar-revista/'+id,JSON.stringify(data),this.httpOptionsToken)
  }

  //Cambiar el status de la revista de ser publico a privado
  public noPublicarRevista(data:any, id:any):Observable<any>{//token
    return this.http.put<any>(this.urlApi+'/no-publicar-revista/'+id,JSON.stringify(data),this.httpOptionsToken)
  }

  //Crear el contenido de la revista selecionada
  public crearImagenesRevista(data):Observable<any>{//token
    return this.http.post<any>(this.urlApi+'/images',data,{headers:{
      'authorization': `Bearer ${localStorage.getItem('token')}`
    }})
  }

  public updatePortada(data,id):Observable<any>{//token
    return this.http.put<any>(this.urlApi+'/portada/'+id,data,{headers:{
      'authorization': `Bearer ${localStorage.getItem('token')}`
    }})
  }

  //Editar el contenido de la revista selecionda
  public editarImagenesRevista(data:any, id:any):Observable<any>{//token
    return this.http.put<any>(this.urlApi+'/images/'+id,JSON.stringify(data),this.httpOptions)
  }

}
