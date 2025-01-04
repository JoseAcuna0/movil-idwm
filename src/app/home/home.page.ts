import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  constructor(private alertController: AlertController, private router: Router) {}

  // Función para mostrar el popup de alerta
  async showLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Acceso restringido',
      message: 'Debes iniciar sesión para acceder a esta sección.',
      buttons: ['OK'], // Botón de cierre
    });

    await alert.present();
  }


  navigateToPrincipalPage() {
    this.router.navigate(['/principal-page']);
  }
}