// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ImportBooksComponent } from './components/import-books/import-books.component';
import { ViewBooksComponent } from './components/view-books/view-books.component';

const routes: Routes = [
  { path: '', redirectTo: 'add-book', pathMatch: 'full' },
  { path: 'add-book', component: AddBookComponent },
  { path: 'import-books', component: ImportBooksComponent },
  { path: 'view-books', component: ViewBooksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
