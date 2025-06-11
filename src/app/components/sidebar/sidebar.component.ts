import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ Required for routerLink

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],  // ✅ Import this
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) {}
  logout() {
  // clear tokens if any (optional)
  this.router.navigate(['/home']);
}
}
