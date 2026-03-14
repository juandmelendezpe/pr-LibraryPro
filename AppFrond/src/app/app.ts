import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  titulo = 'LibraryPro';
  currentTime: string = '';
  loggedUserName: string = '';
  private timerInterval: any;

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.updateTime();
    this.timerInterval = setInterval(() => {
      this.updateTime();
    }, 60000); // Actualiza cada minuto

    // Get the current user name right away (since AuthService stores it in a signal)
    const user = this.authService.getCurrentUser();
    this.loggedUserName = user ? user.nombre : 'Usuario'; // The model Usuario only has 'nombre' property.
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  updateTime() {
    const now = new Date();
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const dayName = days[now.getDay()];
    const date = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0');
    
    this.currentTime = `${dayName} ${date} de ${monthName} ${year} ${hours}:${minutes}`;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
