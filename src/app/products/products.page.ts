import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true, // Indica que este es un componente standalone
  imports: [IonicModule, CommonModule], // Importa dependencias necesaria
})
export class ProductsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToShoppingPage() {
    this.router.navigate(['/shoppin']);
  }

  navigateToAccountPage() {
    this.router.navigate(['/acount']);
  }

  navigateToProductPage() {
    this.router.navigate(['/products']);
  }
}
