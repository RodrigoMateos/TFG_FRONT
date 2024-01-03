import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxImgZoomModule  } from 'ngx-img-zoom';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PintarAulasComponent } from './components/pintar-aulas/pintar-aulas.component';
import { HomeComponent } from './components/home/home.component';
import { CampusComponent } from './components/campus/campus.component';
import { PintarClaseComponent } from './components/pintar-clase/pintar-clase.component';
import { NuevaAulaComponent } from './components/nueva-aula/nueva-aula.component';

@NgModule({
  declarations: [
    AppComponent,
    PintarAulasComponent,
    HomeComponent,
    CampusComponent,
    PintarClaseComponent,
    NuevaAulaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    AppRoutingModule, 
    NgxImgZoomModule,
    NgxImageZoomModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
