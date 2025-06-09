import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-book',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm!: FormGroup; // 👈 This solves the error

  constructor(private fb: FormBuilder) {}

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
      console.log('Book Data:', this.bookForm.value);
      // Submit to backend here
    } else {
      alert('Form is incomplete or invalid. Please fill out all fields correctly.');
    }
  }
}

