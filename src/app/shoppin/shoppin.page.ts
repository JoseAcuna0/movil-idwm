import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoppin',
  templateUrl: './shoppin.page.html',
  styleUrls: ['./shoppin.page.scss'],
  standalone: true, // Indica que este es un componente standalone
  imports: [IonicModule, CommonModule], // Importa dependencias necesaria
})
export class ShoppinPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToShoppingPage() {
    this.router.navigate(['/shoppin']);
  }

  navigateToAccountPage() {
    this.router.navigate(['/acount']);
  }

}
