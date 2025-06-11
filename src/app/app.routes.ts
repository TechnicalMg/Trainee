import { Routes } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ImportBooksComponent } from './components/import-books/import-books.component';
import { ViewBooksComponent } from './components/view-books/view-books.component'; // if needed
import { EditBookComponent } from './components/edit-book/edit-book.component';

export const routes: Routes = [
  { path: 'add-book', component: AddBookComponent },
  { path: 'import-books', component: ImportBooksComponent },
  { path: 'view-books', component: ViewBooksComponent }, // optional
  { path: 'edit-book', component: EditBookComponent },
  { path: '', redirectTo: '/add-book', pathMatch: 'full' }
];
