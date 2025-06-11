import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router'; // ✅ Import this

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterModule // ✅ Necessary for <router-outlet>
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}

// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { SidebarComponent } from "./components/sidebar/sidebar.component";

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, SidebarComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'digital-library';
// }
