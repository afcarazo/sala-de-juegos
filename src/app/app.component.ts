import { Component } from '@angular/core';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(firebaseAuthService:AuthService){}
  title = 'gaming-website';
}
