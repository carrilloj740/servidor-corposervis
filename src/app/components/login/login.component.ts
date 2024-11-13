import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si ya está autenticado y redirigir
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole();
      this.redirectUser(userRole);
    }
  }

  onSubmit() {
    console.log('Submitting:', this.username, this.password); // Mensaje de prueba

    this.authService.login(this.username, this.password).subscribe(
      (isAuthenticated: boolean) => {
        if (isAuthenticated) {
          const userRole = this.authService.getRole();
          this.redirectUser(userRole);
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      (error: any) => {
        this.errorMessage = 'Error al iniciar sesión';
        console.error('Login error:', error);
      }
    );
  }

  private redirectUser(role: string | null) {
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'policia1':
        this.router.navigate(['/policia-marino']);
        break;
      case 'proteccionCM':
        this.router.navigate(['/proteccion-civil-marino']);
        break;
      default:
        this.router.navigate(['/unauthorized']);
    }
  }
}
