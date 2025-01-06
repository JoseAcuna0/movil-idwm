import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:5132/api';

  constructor(private http: HttpClient) {}

  addToCart(cartId: number, body: { productId: number; quantity: number }): Observable<any> {
    const url = `${this.baseUrl}/ShoppingCart/${cartId}/add`;
    return this.http.post(url, body, { responseType: 'text' }); // Especifica que la respuesta es texto
  }
}