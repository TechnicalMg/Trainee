import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  selectedPdfFile: File | null = null;
  pdfError: string = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileSizeKB = file.size / 1024;
      const fileSizeMB = fileSizeKB / 1024;

      if (file.type !== 'application/pdf') {
        this.pdfError = 'Only PDF files are allowed.';
        this.selectedPdfFile = null;
      } else if (fileSizeKB < 10 || fileSizeMB > 10) {
        this.pdfError = 'File must be between 10KB and 10MB.';
        this.selectedPdfFile = null;
      } else {
        this.selectedPdfFile = file;
        this.pdfError = '';
      }
    }
  }

  onSubmit(): void {
    if (this.bookForm.invalid || !this.selectedPdfFile) {
      this.pdfError = 'Please fill all fields and select a valid PDF.';
      return;
    }

    const formData = new FormData();
    formData.append('title', this.bookForm.get('title')?.value);
    formData.append('author', this.bookForm.get('author')?.value);
    formData.append('genre', this.bookForm.get('genre')?.value);
    formData.append('year', this.bookForm.get('year')?.value);
    formData.append('pdf', this.selectedPdfFile);

    this.bookService.addBook(formData).subscribe({
      next: () => {
        alert('Book added successfully!');
        this.bookForm.reset();
        this.selectedPdfFile = null;
      },
      error: (err) => {
        console.error('Error adding book:', err);
        alert('Failed to add book. Please try again.');
      }
    });
  }
}
