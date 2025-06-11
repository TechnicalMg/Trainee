<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  images: string[] = [
    'assets/book1.jpeg',
    'assets/book2.jpeg',
    'assets/book3.jpeg',
    'assets/book4.jpeg',
  ];
  currentIndex = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000); // Change image every 3 seconds
  }

}
=======
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  images: string[] = [
    'assets/img1.jpg',
    'assets/img2.jpg',
    'assets/img3.jpg',
    'assets/img4.jpg',
  ];
  currentIndex = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); // Change image every 3 seconds
  }

}
>>>>>>> d137059098a9e6cef4146c23ead97c5b8fa1b39a
