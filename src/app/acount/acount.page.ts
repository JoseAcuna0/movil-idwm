import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-acount',
  templateUrl: './acount.page.html',
  styleUrls: ['./acount.page.scss'],
  standalone: true, // Indica que este es un componente standalone
  imports: [IonicModule, CommonModule], // Importa dependencias necesaria
})
export class AcountPage implements OnInit {
  showAlert: boolean = false;

  constructor(private alertController: AlertController, private router: Router) {}

  navigateToShoppingPage() {
    this.router.navigate(['/shoppin']);
  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Seguro que quieres eliminar la cuenta?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Sí',
          handler: () => {
            this.deleteAccount();
          },
        },
      ],
    });

    await alert.present();
  }

  deleteAccount() {
    console.log('Cuenta eliminada');
    localStorage.clear(); // Borra cualquier dato almacenado
    sessionStorage.clear(); // Borra datos de sesión
    localStorage.removeItem('userId'); // Elimina el ID del usuario
    this.router.navigate(['/']); // Redirige al inicio
  }

  logout() {
    console.log('Sesión cerrada');
    localStorage.clear(); // Borra cualquier dato almacenado
    sessionStorage.clear(); // Borra datos de sesión
    localStorage.removeItem('userId'); // Elimina el ID del usuario
    this.router.navigate(['/']); // Redirige al inicio
  }

  navigateToProductPage() {
    this.router.navigate(['/products']);
  }

  ngOnInit() {
  }

}