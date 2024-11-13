import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

   // Guardar en localStorage
   setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener desde localStorage
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Eliminar de localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo localStorage
  clear(): void {
    localStorage.clear();
  }
}
