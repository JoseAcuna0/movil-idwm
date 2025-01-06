import { Injectable } from '@angular/core'; // Importa el decorador Injectable para declarar un servicio
import { HttpClient } from '@angular/common/http'; // Cliente HTTP para realizar solicitudes
import { Observable } from 'rxjs'; // Clase Observable para manejar respuestas asíncronas

/**
 * Servicio para interactuar con las facturas (invoices) en la API.
 * Este servicio proporciona métodos para obtener la lista de facturas y los detalles de una factura específica.
 */
@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible globalmente en la aplicación
})
export class InvoiceService {
  // URL base del endpoint de facturas
  private apiUrl = 'http://localhost:5132/api/Invoice';

  /**
   * Constructor del servicio. Inyecta el cliente HTTP de Angular.
   * @param http - Cliente HTTP utilizado para realizar solicitudes a la API
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de todas las facturas disponibles desde el servidor.
   * 
   * @returns Un Observable que emite un array con las facturas.
   */
  getInvoices(): Observable<any[]> {
    // Realiza una solicitud GET al endpoint de facturas
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Obtiene los detalles de una factura específica por su ID.
   * 
   * @param invoiceId - ID de la factura para obtener sus detalles
   * @returns Un Observable que emite los detalles de la factura.
   */
  getInvoiceDetails(invoiceId: number): Observable<any> {
    // Realiza una solicitud GET al endpoint de detalles de la factura
    return this.http.get<any>(`${this.apiUrl}/${invoiceId}`);
  }
}
