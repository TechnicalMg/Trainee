import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: number;
  title: string;
  author: string;
  genre: string;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  // Add a new book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  // Get all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // Get all books (alias for compatibility with view-books component)
  getAllBooks(): Observable<Book[]> {
    return this.getBooks();
  }

  // Get a single book by ID
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  // Update an existing book
updateBook(id: number, bookData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, bookData);
}

  // Delete a book by ID
  deleteBook(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}