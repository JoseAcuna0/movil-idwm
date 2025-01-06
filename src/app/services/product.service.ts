import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl = 'http://localhost:5132/api/ShoppingCart';

  constructor(private apiService: ApiService) {}

  getProducts(params?: any): Observable<any> {
    return this.apiService.get<any>('Product', params);
  }
}
