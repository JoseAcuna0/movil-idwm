import { Injectable } from '@angular/core'; // Importa el decorador Injectable para declarar un servicio
import { ApiService } from './api.service'; // Servicio general para manejar solicitudes HTTP
import { Observable } from 'rxjs'; // Clase Observable para manejar respuestas asíncronas

/**
 * Servicio para interactuar con los productos en la API.
 * Proporciona métodos para obtener la lista de productos disponibles con filtros y parámetros opcionales.
 */
@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible globalmente en la aplicación
})
export class ProductService {
  // URL base del endpoint de productos
  private apiUrl = 'http://localhost:5132/api/ShoppingCart';

  /**
   * Constructor del servicio. Inyecta el servicio genérico `ApiService` para manejar solicitudes HTTP.
   * @param apiService - Servicio general para realizar solicitudes a la API.
   */
  constructor(private apiService: ApiService) {}

  /**
   * Obtiene la lista de productos disponibles desde el servidor.
   * Los productos pueden filtrarse utilizando parámetros opcionales.
   *
   * @param params - Objeto opcional con los parámetros de consulta para filtrar o paginar los productos.
   * @returns Un Observable que emite la lista de productos obtenida del servidor.
   */
  getProducts(params?: any): Observable<any> {
    // Utiliza el servicio genérico `ApiService` para realizar una solicitud GET al endpoint 'Product'.
    return this.apiService.get<any>('Product', params);
  }
}
