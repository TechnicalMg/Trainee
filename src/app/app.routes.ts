import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ImportBooksComponent } from './components/import-books/import-books.component';
import { ViewBooksComponent } from './components/view-books/view-books.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

export const routes: Routes = [
    { path: '', redirectTo: 'add-book', pathMatch: 'full' },
    // { path: 'add-book', component: AddBookComponent, pathMatch: 'full' },
    { path: 'add-book', component: AddBookComponent, },
    { path: 'import-books', component: ImportBooksComponent, pathMatch: 'full' },
    { path: 'view-books', component: ViewBooksComponent,pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }