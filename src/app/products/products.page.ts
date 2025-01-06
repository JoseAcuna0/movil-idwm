import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products', // Selector para identificar el componente
  templateUrl: './products.page.html', // Ruta al archivo HTML asociado al componente
  styleUrls: ['./products.page.scss'], // Ruta al archivo de estilos asociado al componente
  standalone: true, // Indica que este componente no depende de un módulo principal
  imports: [IonicModule, CommonModule, FormsModule], // Importa módulos necesarios para el componente
})
export class ProductsPage implements OnInit {
  // Variables principales
  products: any[] = []; // Lista de productos
  loading = true; // Indica si los datos están cargando
  pageNumber = 1; // Página actual para la paginación
  pageSize = 10; // Tamaño de página (cantidad de productos por página)
  hasMorePages = false; // Indica si hay más páginas disponibles
  selectedCategory: number | null = null; // Categoría seleccionada (por defecto, todas)
  sortOrder: string = 'asc'; // Orden de los productos ('asc' para ascendente, 'desc' para descendente)
  userId: number | null = null; // ID del usuario actual

  // Constructor para inyectar dependencias
  constructor(
    private router: Router, // Servicio para navegar entre páginas
    private productService: ProductService, // Servicio para obtener productos
    private alertController: AlertController, // Servicio para mostrar alertas
    private cartService: CartService // Servicio para manejar el carrito de compras
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Carga el ID del usuario y los productos disponibles.
   */
  ngOnInit() {
    // Obtener el ID del usuario desde localStorage
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null;

    // Si no hay usuario registrado, redirige al inicio
    if (!this.userId) {
      console.error('No se encontró el ID del usuario. Redirigiendo al inicio.');
      this.router.navigate(['/']);
      return;
    }

    this.resetPagination(); // Reinicia la paginación
    this.fetchProducts(); // Carga los productos
  }

  /**
   * Reinicia la paginación al comienzo.
   */
  resetPagination() {
    this.pageNumber = 1; // Página inicial
    this.products = []; // Limpia los productos cargados
  }

  /**
   * Obtiene los productos desde el servicio con los parámetros actuales.
   */
  fetchProducts() {
    const params: any = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      sort: this.sortOrder, // Orden de los productos
    };

    if (this.selectedCategory !== null) {
      params.category = this.selectedCategory; // Filtra por categoría si corresponde
    }

    this.productService.getProducts(params).subscribe({
      next: (response) => {
        this.products = response.products; // Carga los productos
        this.hasMorePages = response.totalItems > this.pageNumber * this.pageSize; // Determina si hay más páginas
        this.loading = false; // Finaliza la carga
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.loading = false;
      },
    });
  }

  /**
   * Cambia el filtro por categoría y recarga los productos.
   */
  onFilterChange() {
    this.resetPagination();
    this.fetchProducts();
  }

  /**
   * Alterna el orden de los productos entre ascendente y descendente.
   */
  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.resetPagination();
    this.fetchProducts();
  }

  /**
   * Muestra un popup para seleccionar la cantidad y agrega un producto al carrito.
   * @param product - Producto seleccionado
   */
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

  /**
   * Agrega un producto al carrito usando un prompt para obtener la cantidad.
   * @param productId - ID del producto
   */
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

        // Muestra un popup de confirmación
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

  /**
   * Cambia de página en la lista de productos.
   * @param direction - Dirección ('next' o 'prev')
   */
  changePage(direction: string) {
    if (direction === 'next') {
      this.pageNumber++;
    } else if (direction === 'prev' && this.pageNumber > 1) {
      this.pageNumber--;
    }
    this.fetchProducts();
  }

  /**
   * Navega a la página de compras.
   */
  navigateToShoppingPage() {
    this.router.navigate(['/shoppin']);
  }

  /**
   * Navega a la página de cuenta.
   */
  navigateToAccountPage() {
    this.router.navigate(['/acount']);
  }

  /**
   * Navega a la página de productos.
   */
  navigateToProductPage() {
    this.router.navigate(['/products']);
  }
}
