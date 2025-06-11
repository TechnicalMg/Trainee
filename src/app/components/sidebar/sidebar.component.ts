import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Required for routerLink

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],  // ✅ Import this
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {}
