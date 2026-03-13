import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  usuario = {
    email: '',
    password: ''
  };

  constructor(private router: Router) { }

  onLogin() {
    console.log('Login intent:', this.usuario);
    // Simulación de login exitoso
    this.router.navigate(['/home']);
  }
}
