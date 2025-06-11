import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-import-books',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './import-books.component.html',
  styleUrl: './import-books.component.css'
})
export class ImportBooksComponent {
  selectedFile: File | null = null;
  fileName: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type !== 'application/pdf') {
        alert('Please upload a valid PDF file.');
        this.selectedFile = null;
        this.fileName = '';
        return;
      }

      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  onImport(): void {
    if (!this.selectedFile) {
      alert('No file selected.');
      return;
    }

    // Here you can send the file to the backend using HttpClient
    console.log('Uploading PDF:', this.selectedFile.name);
  }
}
