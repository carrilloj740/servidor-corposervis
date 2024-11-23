import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    { username: 'corposervis', password: 'toortoor', role: 'admin' },
    {
      username: 'policiasm',
      password: 'WvqZ4HVAPJQBYCzdnRvL',
      role: 'policia1',
    },
    {
      username: 'proteccioncsm',
      password: '1EKxJGzJF9c6PLfD4nZo',
      role: 'proteccionCM',
    },
    {
      username: 'adminUserPmmsmAdm',
      password: 'pass',
      role: 'administracion1',
    },

    {
      username: 'adminUserPcmsmAdm',
      password: 'pass',
      role: 'administracion2',
    },
    { username: 'adminUserPmmsmPer', password: 'pass', role: 'personal1' },
    { username: 'adminUserPcmsmPer', password: 'pass', role: 'personal2' },
  ];

  private role: string | null = null;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  login(username: string, password: string): Observable<boolean> {
    // Verificación
    // console.log('Login attempt:', username, password);

    // Buscar el usuario en la lista
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      console.log('User found:', user);

      // Guarda el token y rol en localStorage
      this.localStorage.setItem('authToken', 'fake-jwt-token');
      this.localStorage.setItem('userRole', user.role);
      this.localStorage.setItem('key', password);

      // Redirige según el rol
      switch (user.role) {
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
      return of(true);
    } else {
      console.warn('Invalid credentials');
      alert('Credenciales incorrectas');
      return of(false);
    }
  }

  isLoggedIn(): boolean {
    return this.localStorage.getItem('authToken') !== null;
  }

  getRole() {
    return this.localStorage.getItem('userRole');
  }

  logout() {
    this.localStorage.removeItem('authToken');
    this.localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}
