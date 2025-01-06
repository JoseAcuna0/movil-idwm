import { Injectable } from '@angular/core'; // Importa las funcionalidades necesarias para declarar un servicio
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; // Importa el cliente HTTP y utilidades para manejar encabezados y parámetros
import { Observable } from 'rxjs'; // Importa Observable para manejar las respuestas asíncronas

/**
 * Servicio genérico para interactuar con la API.
 * Este servicio proporciona métodos reutilizables para realizar solicitudes HTTP.
 */
@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible globalmente en toda la aplicación
})
export class ApiService {
  // URL base de la API
  private baseUrl = 'http://localhost:5132/api';

  // Token de autenticación (si se requiere)
  private token: string = '';

  /**
   * Constructor del servicio. Inyecta el cliente HTTP para realizar solicitudes.
   * @param http - Cliente HTTP proporcionado por Angular
   */
  constructor(private http: HttpClient) {}

  /**
   * Establece el token de autenticación.
   * @param token - Token que se usará para las solicitudes autenticadas
   */
  setToken(token: string): void {
    this.token = token; // Asigna el token proporcionado a la variable privada
  }

  /**
   * Realiza una solicitud HTTP GET al endpoint especificado.
   * 
   * @param endpoint - Endpoint de la API al que se realizará la solicitud (por ejemplo, 'users', 'products').
   * @param params - Parámetros opcionales para la solicitud (se enviarán como query params).
   * @returns Un observable que emite la respuesta del servidor.
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    // Crea los encabezados de la solicitud
    const headers = this.createHeaders();
    // Realiza la solicitud GET al endpoint con los encabezados y parámetros especificados
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers, params });
  }

  /**
   * Realiza una solicitud HTTP POST al endpoint especificado.
   * 
   * @param endpoint - Endpoint de la API al que se realizará la solicitud (por ejemplo, 'users/add', 'orders').
   * @param body - Cuerpo de la solicitud (datos que se enviarán al servidor).
   * @returns Un observable que emite la respuesta del servidor.
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    // Crea los encabezados de la solicitud
    const headers = this.createHeaders();
    // Realiza la solicitud POST al endpoint con los encabezados y cuerpo especificados
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  /**
   * Crea los encabezados HTTP necesarios para las solicitudes.
   * Si se ha configurado un token, se agrega como encabezado de autorización.
   * 
   * @returns Los encabezados HTTP configurados.
   */
  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    // Si hay un token configurado, se incluye en los encabezados
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
}
