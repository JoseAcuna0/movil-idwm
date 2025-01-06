import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home', // Selector para el componente "Home"
  templateUrl: './home.page.html', // Ruta del archivo HTML asociado
  styleUrls: ['./home.page.scss'], // Ruta del archivo SCSS asociado
  standalone: true, // Define este componente como standalone
  imports: [IonicModule, CommonModule, FormsModule], // Importa los módulos necesarios
})
export class HomePage {
  // Propiedades del componente
  email: string = ''; // Propiedad para almacenar el correo electrónico del usuario
  password: string = ''; // Propiedad para almacenar la contraseña del usuario
  users: any[] = []; // Lista para almacenar los usuarios obtenidos desde la API

  // Constructor para inyectar dependencias
  constructor(
    private alertController: AlertController, // Servicio para mostrar alertas
    private router: Router, // Servicio para navegación entre rutas
    private userService: UserService // Servicio para gestionar usuarios
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga la lista de usuarios desde la API y resetea el formulario.
   */
  ngOnInit() {
    this.resetForm(); // Resetea el formulario al iniciar
    this.loadUsers(); // Carga los usuarios desde la API
  }

  /**
   * Carga todos los usuarios desde la API utilizando el servicio `UserService`.
   */
  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response; // Almacena los usuarios obtenidos
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err); // Manejo de errores en caso de fallo
      },
    });
  }

  /**
   * Valida el inicio de sesión del usuario.
   * Si las credenciales coinciden con un usuario existente, redirige a la página principal.
   * Si no coinciden, muestra un mensaje de error.
   */
  async login() {
    // Busca un usuario que coincida con el correo y la contraseña ingresados
    const user = this.users.find(
      (u) => u.email === this.email && u.password === this.password
    );

    if (user) {
      // Almacena el ID del usuario en localStorage para futuras referencias
      localStorage.setItem('userId', user.id.toString());
      this.router.navigate(['/principal-page']); // Redirige a la página principal
    } else {
      // Muestra un mensaje de error si las credenciales no son válidas
      const alert = await this.alertController.create({
        header: 'Error', // Título de la alerta
        message: 'Correo o contraseña incorrectos.', // Mensaje de error
        buttons: ['OK'], // Botón para cerrar la alerta
      });
      await alert.present();
    }
  }

  /**
   * Muestra un mensaje de acceso restringido si el usuario intenta acceder
   * a una sección sin haber iniciado sesión.
   */
  async showLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Acceso restringido', // Título de la alerta
      message: 'Debes iniciar sesión para acceder a esta sección.', // Mensaje de error
      buttons: ['OK'], // Botón para cerrar la alerta
    });

    await alert.present(); // Muestra la alerta
  }

  /**
   * Resetea el formulario de inicio de sesión (limpia los campos).
   */
  resetForm() {
    this.email = ''; // Limpia el campo de correo
    this.password = ''; // Limpia el campo de contraseña
  }

  /**
   * Método que se ejecuta cada vez que se entra a la vista del componente.
   * Asegura que el formulario esté limpio al ingresar.
   */
  ionViewWillEnter() {
    this.resetForm(); // Limpia el formulario
  }

  /**
   * Navega a la página principal (principal-page).
   * Aunque no se utiliza directamente, está disponible para posibles usos futuros.
   */
  navigateToPrincipalPage() {
    this.router.navigate(['/principal-page']); // Redirige a la página principal
  }
}
