import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.page.html',
  styleUrls: ['./principal-page.page.scss'],
  standalone: true, // Indica que este es un componente standalone
  imports: [IonicModule, CommonModule], // Importa dependencias necesaria
})
export class PrincipalPagePage implements OnInit {
  constructor(private alertController: AlertController, private router: Router) {}

  async showLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Acceso restringido',
      message: 'Debes iniciar sesión para acceder a esta sección.',
      buttons: ['OK'], // Botón de cierre
    });

    await alert.present();
  }

  navigateToAccountPage() {
    this.router.navigate(['/acount']);
  }

  navigateToShoppingPage() {
    this.router.navigate(['/shoppin']);
  }

  ngOnInit() {
  }

}
