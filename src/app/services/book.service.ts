// src/app/services/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Get all books
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Get book by ID
  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Add new book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Update book
  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Delete book
  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Search books by title or author
  searchBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/search?q=${query}`)
      .pipe(catchError(this.handleError));
  }

  // Export books to file
  exportBooks(format: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export?format=${format}`, { 
      responseType: 'blob' 
    }).pipe(catchError(this.handleError));
  }

  // Import books from file
  importBooks(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/import`, formData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}