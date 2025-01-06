import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = 'http://localhost:5132/api/User'; // Cambia según tu configuración

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    const allUsers: any[] = [];
    const fetchPage = (pageNumber: number): Observable<any> =>
      this.http.get<any>(`${this.apiUrl}?pageSize=10&pageNumber=${pageNumber}`);
  
    return new Observable((subscriber) => {
      const fetchRecursive = (pageNumber: number) => {
        fetchPage(pageNumber).subscribe({
          next: (response) => {
            allUsers.push(...response.users);
            if (pageNumber < response.totalPages) {
              fetchRecursive(pageNumber + 1); // Fetch next page
            } else {
              subscriber.next(allUsers);
              subscriber.complete();
            }
          },
          error: (err) => {
            subscriber.error(err);
          },
        });
      };
  
      fetchRecursive(1); // Start from the first page
    });
  }
}