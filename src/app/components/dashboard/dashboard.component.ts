// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  error: string = '';
  successMessage: string = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.error = '';
    
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.filteredBooks = books;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load books. Please try again.';
        this.loading = false;
        console.error('Error loading books:', error);
      }
    });
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredBooks = this.books;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  }

  deleteBook(book: Book): void {
    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
      this.bookService.deleteBook(book.bookId!).subscribe({
        next: () => {
          this.successMessage = `Book "${book.title}" deleted successfully!`;
          this.loadBooks();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.error = 'Failed to delete book. Please try again.';
          console.error('Error deleting book:', error);
          setTimeout(() => this.error = '', 3000);
        }
      });
    }
  }

  clearMessages(): void {
    this.error = '';
    this.successMessage = '';
  }
}