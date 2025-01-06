import { Injectable } from '@angular/core'; // Importa la funcionalidad para declarar un servicio
import { HttpClient } from '@angular/common/http'; // Importa el cliente HTTP para realizar solicitudes
import { Observable } from 'rxjs'; // Importa Observable para manejar respuestas asíncronas

/**
 * Servicio para manejar las operaciones relacionadas con el carrito de compras.
 */
@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible de manera global en toda la aplicación
})
export class CartService {
  // URL base de la API
  private baseUrl = 'http://localhost:5132/api';

  /**
   * Constructor del servicio. Inyecta el cliente HTTP para realizar solicitudes.
   * @param http - Cliente HTTP proporcionado por Angular
   */
  constructor(private http: HttpClient) {}

  /**
   * Agrega un producto al carrito.
   * 
   * @param cartId - ID del carrito (generalmente es el ID del usuario)
   * @param body - Cuerpo de la solicitud que incluye:
   *               - `productId`: ID del producto a agregar
   *               - `quantity`: Cantidad del producto a agregar
   * @returns Un observable que emite la respuesta del servidor
   */
  addToCart(cartId: number, body: { productId: number; quantity: number }): Observable<any> {
    // Construye la URL completa para la solicitud
    const url = `${this.baseUrl}/ShoppingCart/${cartId}/add`;

    // Realiza una solicitud POST al endpoint con el cuerpo especificado y espera una respuesta en formato de texto
    return this.http.post(url, body, { responseType: 'text' });
  }
}
