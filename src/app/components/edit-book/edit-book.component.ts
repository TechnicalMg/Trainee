import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnChanges {
  @Input() book: any;
  @Output() close = new EventEmitter<void>();

  editBookForm!: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book) {
      this.editBookForm = this.fb.group({
        title: [this.book.title, Validators.required],
        author: [this.book.author, Validators.required],
        genre: [this.book.genre, Validators.required],
        year: [this.book.year, [Validators.required, Validators.min(1900), Validators.max(2100)]]
      });
    }
  }

  onUpdate(): void {
    if (this.editBookForm.valid && this.book?.id) {
      this.bookService.updateBook(this.book.id, this.editBookForm.value).subscribe({
        next: () => {
          alert('Book updated successfully!');
          this.close.emit();
        },
        error: (err) => {
          alert('Failed to update book.');
          console.error(err);
        }
      });
    } else {
      alert('Please fill the form correctly.');
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}
