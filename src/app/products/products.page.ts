import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true, // Indica que este es un componente standalone
  imports: [IonicModule, CommonModule, FormsModule], // Importa dependencias necesarias
})
export class ProductsPage implements OnInit {
  products: any[] = [];
  loading = true;
  pageNumber = 1;
  pageSize = 10;
  hasMorePages = false;
  selectedCategory: number | null = null; // Valor por defecto para mostrar todos
  sortOrder: string = 'asc'; // 'asc' o 'desc'
  userId: number | null = null; // ID del usuario

  constructor(
    private router: Router,
    private productService: ProductService,
    private alertController: AlertController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Obtener el ID del usuario desde localStorage
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null;

    if (!this.userId) {
      console.error('No se encontró el ID del usuario. Redirigiendo al inicio.');
      this.router.navigate(['/']);
      return;
    }

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

  async addToCart(product: any) {
    const alert = await this.alertController.create({
      header: 'Agregar al carrito',
      message: `¿Cuántas unidades de "${product.name}" deseas agregar al carrito?`,
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          },
        },
        {
          text: 'Agregar',
          handler: (data) => {
            const quantity = parseInt(data.quantity, 10);
            if (isNaN(quantity) || quantity <= 0) {
              console.error('Cantidad inválida');
              return;
            }
  
            if (!this.userId) {
              console.error('No se encontró el ID del usuario. Redirigiendo al inicio.');
              this.router.navigate(['/']);
              return;
            }
  
            const cartId = this.userId; // Usamos el userId como cartId
  
            this.cartService.addToCart(cartId, { productId: product.productId, quantity }).subscribe({
              next: (response) => {
                console.log('Producto agregado al carrito:', response);
              },
              error: (error) => {
                console.error('Error al agregar al carrito:', error);
                if (error.status === 404) {
                  console.error('El endpoint no se encontró. Verifica la URL o el backend.');
                }
              },
            });
          },
        },
      ],
    });
  
    await alert.present();
  }

  addToCartRequest(productId: number) {
    if (!this.userId) {
      console.error('No se encontró el ID del usuario. Redirigiendo al inicio.');
      this.router.navigate(['/']);
      return;
    }
  
    const quantity = prompt('¿Cuántas unidades deseas agregar?');
    if (!quantity || isNaN(+quantity) || +quantity <= 0) {
      console.error('Cantidad no válida ingresada.');
      return;
    }
  
    const cartId = this.userId; // Usamos el userId como cartId
    console.log('Datos antes de enviar al servicio:');
    console.log('Cart ID:', cartId);
    console.log('Product ID:', productId);
    console.log('Quantity:', quantity);
  
    this.cartService.addToCart(cartId, { productId, quantity: +quantity }).subscribe({
      next: async (response) => {
        console.log('Respuesta del servidor:', response);
        if (typeof response === 'string') {
          console.log('Mensaje del servidor:', response);
        } else {
          console.log('Producto agregado correctamente:', response);
        }
  
        // Mostrar popup
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Producto agregado correctamente al carrito.',
          buttons: ['OK'],
        });
        await alert.present();
      },
      error: (error) => {
        console.error('Error al agregar al carrito:', error);
        if (error.status === 404) {
          console.error('El endpoint no se encontró. Verifica la URL o el backend.');
        }
      },
    });
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
