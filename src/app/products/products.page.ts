import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true, // Indica que este es un componente standalone
  imports: [IonicModule, CommonModule, FormsModule], // Importa dependencias necesaria
})
export class ProductsPage implements OnInit {
  products: any[] = [];
  loading = true;
  pageNumber = 1;
  pageSize = 10;
  hasMorePages = false;
  selectedCategory: number | null = null; // Valor por defecto para mostrar todos
  sortOrder: string = 'asc'; // 'asc' o 'desc'

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.resetPagination();
    this.fetchProducts();
  }

  resetPagination() {
    this.pageNumber = 1; // Reinicia a la página 1
    this.products = []; // Limpia el listado actual de productos
  }

  fetchProducts() {
    const params: any = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      sort: this.sortOrder,
    };

    if (this.selectedCategory !== null) {
      params.category = this.selectedCategory;
    }

    this.productService.getProducts(params).subscribe({
      next: (response) => {
        this.products = response.products;
        this.hasMorePages = response.totalItems > this.pageNumber * this.pageSize;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.loading = false;
      },
    });
  }

  onFilterChange() {
    this.resetPagination();
    this.fetchProducts();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.resetPagination();
    this.fetchProducts();
  }

  addToCart(product: any) {
    console.log(`Producto agregado al carrito: ${product.name}`);
  }

  changePage(direction: string) {
    if (direction === 'next') {
      this.pageNumber++;
    } else if (direction === 'prev' && this.pageNumber > 1) {
      this.pageNumber--;
    }
    this.fetchProducts();
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
