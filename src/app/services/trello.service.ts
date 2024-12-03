import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrelloService {
  private baseUrl = environment.trelloBaseUrl;
  private apiKey = environment.trelloApiKey;
  private token = environment.trelloToken;

  constructor(private http: HttpClient) {}

// Crear tajeta
  createCard(
    idList: string,
    name: string,
    desc: string = '',
    idMembers: string = '',
    idLabels: string = '',
  ): Observable<any> {
    const url = `${this.baseUrl}/cards`;

    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('token', this.token)
      .set('idList', idList)
      .set('name', name)
      .set('desc', desc)
      .set('idMembers', idMembers)
      .set('idLabels', idLabels);

    return this.http.post(url, {}, { params }).pipe(
      catchError((error) => {
        console.error('Error al crear tarjeta:', error);
        return throwError(() => error);
      })
    );
  }

// Agregar comentario
  addCommentToCard(cardId: string, text: string): Observable<any> {
    const url = `${this.baseUrl}/cards/${cardId}/actions/comments`;

    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('token', this.token)
      .set('text', text);

    console.log('URL generada:', url);
    console.log('Parámetros:', params.toString());

    return this.http.post(url, {}, { params }).pipe(
      catchError((error) => {
        console.error('Error al añadir comentario:', error);
        if (error.status === 400) {
          console.error('Solicitud inválida. Revisa los datos enviados.');
        } else if (error.status === 401) {
          console.error('No autorizado. Verifica tu API Key y Token.');
        } else if (error.status === 404) {
          console.error('Recurso no encontrado. Verifica el cardId.');
        }
        return throwError(() => error);
      })
    );
  }


  // Mostrar tarjetas
  getCardsByList(listId: string): Observable<any[]> {
    const url = `${this.baseUrl}/lists/${listId}/cards?key=${this.apiKey}&token=${this.token}`;
    return this.http.get<any[]>(url);
  }


}
