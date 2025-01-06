import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-page', // Selector para el componente principal de la página
  templateUrl: './principal-page.page.html', // Ruta del archivo HTML asociado
  styleUrls: ['./principal-page.page.scss'], // Ruta del archivo SCSS asociado
  standalone: true, // Indica que este componente es independiente y no requiere un módulo adicional
  imports: [IonicModule, CommonModule], // Importa los módulos necesarios para el funcionamiento del componente
})
export class PrincipalPagePage implements OnInit {
  // Constructor para inyectar dependencias necesarias
  constructor(
    private alertController: AlertController, // Servicio para manejar alertas
    private router: Router // Servicio para la navegación entre rutas
  ) {}

  /**
   * Muestra un mensaje de alerta al usuario indicando que debe iniciar sesión
   * para acceder a la sección correspondiente.
   */
  async showLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Acceso restringido', // Título del mensaje de alerta
      message: 'Debes iniciar sesión para acceder a esta sección.', // Cuerpo del mensaje de alerta
      buttons: ['OK'], // Botón para cerrar la alerta
    });

    await alert.present(); // Presenta la alerta al usuario
  }

  /**
   * Navega a la página de "Cuenta".
   * Esta función redirige al usuario a la página de administración de cuenta.
   */
  navigateToAccountPage() {
    this.router.navigate(['/acount']); // Redirige a la ruta "/acount"
  }

  /**
   * Navega a la página de "Compras".
   * Esta función redirige al usuario al historial de compras realizadas.
   */
  navigateToShoppingPage() {
    this.router.navigate(['/shoppin']); // Redirige a la ruta "/shoppin"
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Se utiliza principalmente para configurar el componente al cargarse.
   */
  ngOnInit() {}

  /**
   * Navega a la página de "Productos".
   * Esta función redirige al usuario a la lista de productos disponibles.
   */
  navigateToProductPage() {
    this.router.navigate(['/products']); // Redirige a la ruta "/products"
  }
}
