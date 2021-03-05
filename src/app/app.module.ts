import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';
import { EscritorComponent } from './component/escritor/escritor.component';
import { PublicadorComponent } from './component/publicador/publicador.component';
import { LectorComponent } from './component/lector/lector.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RevistaComponent } from './component/revista/revista.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltroRevistaComponent } from './component/filtro-revista/filtro-revista.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    EscritorComponent,
    PublicadorComponent,
    LectorComponent,
    RevistaComponent,
    FiltroRevistaComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
