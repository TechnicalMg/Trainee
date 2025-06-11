import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  @Input() bookId!: number;
  @Output() close = new EventEmitter<void>();
  editBookForm!: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
    this.editBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(0)]]
    });

    this.loadBook();
  }

  loadBook(): void {
    this.bookService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.editBookForm.patchValue({
          title: book.title,
          author: book.author,
          genre: book.genre,
          year: book.year
        });
      },
      error: (err) => {
        alert('Failed to load book for editing.');
        console.error(err);
      }
    });
  }

  onUpdate(): void {
    if (this.editBookForm.valid) {
      const updatedBook = this.editBookForm.value;
      this.bookService.updateBook(this.bookId, updatedBook).subscribe({
        next: () => {
          alert('Book updated successfully!');
          this.close.emit();
        },
        error: (err) => {
          alert('Failed to update book.');
          console.error(err);
        }
      });
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}
