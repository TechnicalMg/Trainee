import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Import your backend service (adjust the path as needed)
import { BookService } from '../../services/book.service';
import { EditBookComponent } from "../edit-book/edit-book.component";

@Component({
  selector: 'app-view-books',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, EditBookComponent],
  templateUrl: './view-books.component.html',
  styleUrl: './view-books.component.css'
})
export class ViewBooksComponent implements OnInit {
  searchText: string = '';
  books: any[] = [];
  loading: boolean = false;
  error: string = '';
  selectedBook: any = null;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  // Load books from database
  loadBooks(): void {
    this.loading = true;
    this.error = '';
    
    // Replace this with your actual service call
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

  // Filter books based on search text
  filteredBooks() {
    if (!this.searchText.trim()) {
      return this.books;
    }
    
    const text = this.searchText.toLowerCase();
    return this.books.filter(book =>
      book.title.toLowerCase().includes(text) ||
      book.author.toLowerCase().includes(text) ||
      book.genre.toLowerCase().includes(text) ||
      book.year.toString().includes(text)
    );
  }

  // Navigate to edit page or open edit modal
// selectedBook: any = null;

onEdit(book: any): void {
  this.selectedBook = { ...book }; // Pass data to edit component
}

onEditClose(): void {
  this.selectedBook = null;
  this.loadBooks(); // Refresh after edit
}


  // Delete book from database
  onDelete(book: any): void {
    const confirmed = confirm(`Are you sure you want to delete "${book.title}"?`);
    if (confirmed) {
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

  // Export book information to text file
  onExport(book: any): void {
    const content = `Title: ${book.title}
Author: ${book.author}
Genre: ${book.genre}
Year of Publish: ${book.year}
Book ID: ${book.id}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${book.title.replace(/\s+/g, '_')}_info.txt`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

  // Refresh the book list
  onRefresh(): void {
    this.loadBooks();
  }
}