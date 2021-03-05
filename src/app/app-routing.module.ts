import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../app/component/login/login.component';
import { RegistroComponent } from '../app/component/registro/registro.component';
import { EscritorComponent } from '../app/component/escritor/escritor.component';
import { PublicadorComponent } from '../app/component/publicador/publicador.component';
import { LectorComponent } from '../app/component/lector/lector.component';
import { RevistaComponent } from '../app/component/revista/revista.component';
import { FiltroRevistaComponent } from '../app/component/filtro-revista/filtro-revista.component';


const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'registro',component:RegistroComponent},
  { path:'escritor', component:EscritorComponent},
  { path:'publicador',component:PublicadorComponent},
  { path:'lector', component:LectorComponent},
  { path:'revista/:type/:id', component:RevistaComponent },
  { path:'filtro/:type', component:FiltroRevistaComponent },
  { path:'**', redirectTo:'lector' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
