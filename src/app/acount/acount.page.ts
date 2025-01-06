import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service'; // Importa el servicio de usuarios

@Component({
  selector: 'app-acount',
  templateUrl: './acount.page.html',
  styleUrls: ['./acount.page.scss'],
  standalone: true, // Indica que este es un componente standalone
  imports: [IonicModule, CommonModule], // Importa dependencias necesarias
})
export class AcountPage implements OnInit {
  userId: number | null = null;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private userService: UserService // Inyecta el servicio de usuarios
  ) {}

  ngOnInit() {
    // Recupera el ID del usuario desde localStorage
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null;
  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Seguro que quieres eliminar la cuenta? Esta acción no se puede deshacer.',
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
            if (this.userId) {
              this.deleteAccount(this.userId);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  deleteAccount(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: async () => {
        await this.showToast('Cuenta eliminada con éxito.');
        this.logout(); // Cierra sesión después de eliminar la cuenta
      },
      error: async (err) => {
        console.error('Error al eliminar la cuenta:', err);
        await this.showToast('Ocurrió un error al intentar eliminar la cuenta.');
      },
    });
  }

  logout() {
    console.log('Sesión cerrada');
    localStorage.clear(); // Borra cualquier dato almacenado
    sessionStorage.clear(); // Borra datos de sesión
    this.router.navigate(['/']); // Redirige al inicio
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  navigateToShoppingPage() {
    this.router.navigate(['/shoppin']);
  }

  navigateToProductPage() {
    this.router.navigate(['/products']);
  }
}