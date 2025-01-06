import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service'; // Importa el servicio de usuarios

@Component({
  selector: 'app-acount', // Selector para el componente "acount"
  templateUrl: './acount.page.html', // Ruta del archivo HTML asociado
  styleUrls: ['./acount.page.scss'], // Ruta del archivo de estilos SCSS asociado
  standalone: true, // Indica que este es un componente independiente
  imports: [IonicModule, CommonModule], // Importa los módulos necesarios
})
export class AcountPage implements OnInit {
  // Propiedad que almacena el ID del usuario actual
  userId: number | null = null;

  // Constructor para inyectar dependencias
  constructor(
    private alertController: AlertController, // Controlador para mostrar alertas
    private toastController: ToastController, // Controlador para mostrar notificaciones (toasts)
    private router: Router, // Servicio para navegar entre rutas
    private userService: UserService // Servicio para manejar operaciones relacionadas con usuarios
  ) {}

  /**
   * Método de inicialización del componente.
   * Se ejecuta cuando el componente es cargado.
   */
  ngOnInit() {
    // Recupera el ID del usuario desde localStorage
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null;
  }

  /**
   * Muestra una alerta para confirmar si el usuario desea eliminar su cuenta.
   * Si el usuario confirma, se ejecuta el método `deleteAccount`.
   */
  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Advertencia', // Título de la alerta
      message: '¿Seguro que quieres eliminar la cuenta? Esta acción no se puede deshacer.', // Mensaje
      buttons: [
        {
          text: 'No', // Botón para cancelar la acción
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Sí', // Botón para confirmar la eliminación
          handler: () => {
            if (this.userId) {
              this.deleteAccount(this.userId);
            }
          },
        },
      ],
    });

    await alert.present(); // Muestra la alerta
  }

  /**
   * Elimina la cuenta del usuario enviando una solicitud al backend.
   * @param userId ID del usuario que será eliminado.
   */
  deleteAccount(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: async () => {
        // Muestra un mensaje de éxito al eliminar la cuenta
        await this.showToast('Cuenta eliminada con éxito.');
        this.logout(); // Cierra sesión después de eliminar la cuenta
      },
      error: async (err) => {
        console.error('Error al eliminar la cuenta:', err);
        // Muestra un mensaje de error si ocurre algún problema
        await this.showToast('Ocurrió un error al intentar eliminar la cuenta.');
      },
    });
  }

  /**
   * Cierra la sesión del usuario actual.
   * Borra los datos almacenados en localStorage y sessionStorage.
   */
  logout() {
    console.log('Sesión cerrada');
    localStorage.clear(); // Borra cualquier dato almacenado
    sessionStorage.clear(); // Borra datos de sesión
    this.router.navigate(['/']); // Redirige al inicio
  }

  /**
   * Muestra un mensaje en forma de notificación (toast) en la parte inferior de la pantalla.
   * @param message El mensaje que se mostrará en el toast.
   */
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message, // Mensaje a mostrar
      duration: 2000, // Duración del toast (en milisegundos)
      position: 'bottom', // Posición del toast en la pantalla
    });
    await toast.present(); // Muestra el toast
  }

  /**
   * Navega a la página de historial de compras.
   */
  navigateToShoppingPage() {
    this.router.navigate(['/shoppin']);
  }

  /**
   * Navega a la página de productos.
   */
  navigateToProductPage() {
    this.router.navigate(['/products']);
  }
}
