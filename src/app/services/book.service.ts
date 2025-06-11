import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  // POST: Add a new book with PDF
  addBook(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  // GET: Fetch all books
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/${id}`);
}

  // PUT: Update book
  updateBook(id: number, updatedBook: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedBook);
  }

  // DELETE: Delete book
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // GET: Download PDF
  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' });
  }
}
