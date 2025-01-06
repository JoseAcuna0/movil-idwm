import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, // Declaración del componente principal
  ],
  imports: [
    BrowserModule, // Módulo básico para el navegador
    IonicModule.forRoot(), // Configuración de Ionic
    HttpClientModule,
    FormsModule,
    AppRoutingModule, // Configuración de las rutas
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Reutilización de rutas en Ionic
  ],
  bootstrap: [AppComponent], // Punto de entrada de la aplicación
})
export class AppModule {}