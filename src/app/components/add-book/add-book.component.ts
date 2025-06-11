import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { BookService } from '../../services/book.service'; // Make sure this path is correct

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports : [CommonModule, ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe({
        next: (response) => {
          alert('Book added successfully!');
          this.bookForm.reset();
        },
        error: (error) => {
          console.error('Error adding book:', error);
          alert('Failed to add book. Please try again.');
        }
      });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
