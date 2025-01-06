import { Injectable } from '@angular/core'; // Importa el decorador Injectable para declarar un servicio
import { HttpClient } from '@angular/common/http'; // Módulo para realizar solicitudes HTTP
import { Observable } from 'rxjs'; // Clase Observable para manejar respuestas asíncronas

/**
 * Servicio para manejar operaciones relacionadas con usuarios.
 * Proporciona métodos para obtener la lista completa de usuarios y eliminar usuarios específicos.
 */
@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible globalmente en la aplicación
})
export class UserService {
  // URL base del endpoint de usuarios
  private apiUrl = 'http://localhost:5132/api/User'; // Ajusta según tu configuración del backend

  /**
   * Constructor del servicio. Inyecta el servicio HttpClient para realizar solicitudes HTTP.
   * @param http - Servicio de Angular para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los usuarios desde la API, manejando la paginación automáticamente.
   * Combina todas las páginas de resultados en una sola lista.
   *
   * @returns Un Observable que emite una lista completa de usuarios.
   */
  getAllUsers(): Observable<any[]> {
    const allUsers: any[] = []; // Lista acumulativa de usuarios
    const fetchPage = (pageNumber: number): Observable<any> =>
      // Realiza una solicitud GET para obtener una página específica de usuarios
      this.http.get<any>(`${this.apiUrl}?pageSize=10&pageNumber=${pageNumber}`);

    return new Observable((subscriber) => {
      /**
       * Función recursiva para manejar la paginación.
       * Continúa solicitando páginas hasta que se hayan obtenido todos los usuarios.
       *
       * @param pageNumber - Número de la página actual.
       */
      const fetchRecursive = (pageNumber: number) => {
        fetchPage(pageNumber).subscribe({
          next: (response) => {
            // Agrega los usuarios de la página actual a la lista acumulativa
            allUsers.push(...response.users);

            // Si hay más páginas, continúa solicitando
            if (pageNumber < response.totalPages) {
              fetchRecursive(pageNumber + 1); // Solicita la siguiente página
            } else {
              // Cuando no hay más páginas, emite el resultado y completa el Observable
              subscriber.next(allUsers);
              subscriber.complete();
            }
          },
          error: (err) => {
            // En caso de error, emite el error al Observable
            subscriber.error(err);
          },
        });
      };

      fetchRecursive(1); // Inicia la solicitud desde la primera página
    });
  }

  /**
   * Elimina un usuario específico de la base de datos.
   *
   * @param userId - ID del usuario a eliminar.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${userId}`; // Construye la URL del endpoint para eliminar un usuario
    return this.http.delete(url); // Realiza la solicitud DELETE
  }
}
