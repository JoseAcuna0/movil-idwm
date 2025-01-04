import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, // Declaración del componente principal
  ],
  imports: [
    BrowserModule, // Módulo básico para el navegador
    IonicModule.forRoot(), // Configuración de Ionic
    AppRoutingModule, // Configuración de las rutas
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Reutilización de rutas en Ionic
  ],
  bootstrap: [AppComponent], // Punto de entrada de la aplicación
})
export class AppModule {}