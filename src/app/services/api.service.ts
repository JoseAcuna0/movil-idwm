import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5132/api';
  private token: string = '';

  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    this.token = token;
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    const headers = this.createHeaders();
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers, params });
  }

  // Método general para POST
  post<T>(endpoint: string, body: any): Observable<T> {
    const headers = this.createHeaders();
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers });
  }

  // Crear headers con el token
  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
}
