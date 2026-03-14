import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  onLogin() {
    this.errorMessage = null;
    this.loading = true;

    this.authService.login(this.usuario.email, this.usuario.password).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.success) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (err: any) => {
        console.error('Login error', err);
        this.loading = false;
        this.errorMessage = 'Ocurrió un error al intentar conectarse al servidor.';
      }
    });
  }
}
