import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {

  email: string = '';
  password: string = '';
  users: any[] = [];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.resetForm();
    this.loadUsers();
  }

  // Carga los usuarios desde la API
  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      },
    });
  }

  // Valida el inicio de sesión
  async login() {
    const user = this.users.find(
      (u) => u.email === this.email && u.password === this.password
    );

    if (user) {
      localStorage.setItem('userId', user.id.toString());
      this.router.navigate(['/principal-page']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo o contraseña incorrectos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  // Función para mostrar el popup de alerta
  async showLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Acceso restringido',
      message: 'Debes iniciar sesión para acceder a esta sección.',
      buttons: ['OK'], // Botón de cierre
    });

    await alert.present();
  }

  resetForm() {
    this.email = '';
    this.password = '';
  }

  ionViewWillEnter() {
    this.resetForm(); // Asegura que se limpie cada vez que entres al Home
  }
  
  navigateToPrincipalPage() {
    this.router.navigate(['/principal-page']);
  }
}