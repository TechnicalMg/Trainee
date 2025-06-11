import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BookService } from '../../services/book.service';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-view-books',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, EditBookComponent],
  templateUrl: './view-books.component.html',
  styleUrl: './view-books.component.css'
})
export class ViewBooksComponent implements OnInit {
  searchText: string = '';
  books: any[] = [];
  loading: boolean = false;
  error: string = '';
  selectedBookId: number | null = null;

  constructor(
    private bookService: BookService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.error = '';

    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load books';
        this.loading = false;
        console.error('Error loading books:', err);
      }
    });
  }

  filteredBooks() {
    if (!this.searchText.trim()) return this.books;

    const text = this.searchText.toLowerCase();
    return this.books.filter(book =>
      book.title.toLowerCase().includes(text) ||
      book.author.toLowerCase().includes(text) ||
      book.genre.toLowerCase().includes(text) ||
      book.year.toString().includes(text)
    );
  }

  onEdit(book: any): void {
    this.selectedBookId = book.id;
  }

  onEditClose(): void {
    this.selectedBookId = null; // ✅ fix here
    this.loadBooks();
  }

onDelete(book: any): void {
  console.log('Deleting book with ID:', book.id);  // <- Add this

  const firstConfirm = confirm(`Are you sure you want to delete "${book.title}"?`);
  if (firstConfirm) {
    const secondConfirm = confirm(`This action is permanent. Do you really want to delete "${book.title}" from the library?`);

    if (secondConfirm) {
      if (!book.id) {
        alert("Invalid book ID. Cannot delete.");
        return;
      }

      this.loading = true;
      this.bookService.deleteBook(book.id).subscribe({
        next: () => {
          this.books = this.books.filter(b => b.id !== book.id);
          this.loading = false;
          alert('Book deleted successfully!');
        },
        error: (err) => {
          this.loading = false;
          alert('Failed to delete book. Please try again.');
          console.error('Error deleting book:', err);
        }
      });
    }
  }
}



  onExport(book: any): void {
    const url = `http://localhost:8080/api/books/pdf/${book.id}`;
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = book.pdfName || `${book.title}_book.pdf`;
        link.click();
      },
      error: (error) => {
        alert('Failed to download PDF');
        console.error('Error downloading PDF:', error);
      }
    });
  }

  onRefresh(): void {
    this.loadBooks();
  }
}
