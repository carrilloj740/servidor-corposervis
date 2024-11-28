import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrelloService } from 'src/app/services/trello.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-policia',
  templateUrl: './policia.component.html',
  styleUrls: ['./policia.component.css'],
})
export class PoliciaComponent {
  combinedForm: FormGroup;
  createdCardId: string | null = null;
  cardCreatedStatus: boolean = false;

  cards: any[] = [];

  cardsProcess: any[] = [];
  cardsPendiente: any[] = [];

  constructor(
    private fb: FormBuilder,
    private trelloService: TrelloService,
    private router: Router,
    public _location: Location
  ) {
    this.combinedForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      desc: [''],
      comment: [''],
      idMembers: [''],
    });
  }

  onSubmit() {
    this.createCard();
  }

  // Create card

  createCard() {
    if (this.combinedForm.invalid) {
      alert('Por favor, completa correctamente el formulario.');
      return;
    }

    const { name, desc, comment } = this.combinedForm.value;
    const idList = environment.idListPSM;
    const idMembers = environment.idMembers;
    const idLabels = environment.idLabelPSM;

    // Crear tarjeta en Trello
    this.trelloService
      .createCard(idList, name, desc, idMembers, idLabels)
      .subscribe({
        next: (response) => {
          console.log('Tarjeta creada:', response);
          this.createdCardId = response.id;

          // alert('¡Tarjeta creada con éxito!');
          this.cardCreatedStatus = true;
          setTimeout(() => {
            this.cardCreatedStatus = false;
          }, 5000);
          // Si hay un comentario, añadirlo
          if (comment) {
            this.addCommentToCard(response.id, comment);
          }
          // Reiniciar formulario
          this.combinedForm.reset();
        },
        error: (error) => {
          console.error('Error al crear la tarjeta:', error);
          alert('Hubo un error al crear la tarjeta.');
        },
      });
  }

  // Se agrega comentario en tarjeta
  addCommentToCard(cardId: string, comment: string) {
    this.trelloService.addCommentToCard(cardId, comment).subscribe({});
  }

  ngOnInit() {
    this.getCardsByList(environment.idListPSMFinalizado, 'finalizado');
    this.getCardsByList(environment.idListPSMProceso, 'proceso');
    this.getCardsByList(environment.idListPSMPendiente, 'pendiente');
  }

  // getCardsFinalizado(): void {
  //   this.trelloService
  //     .getCardsByList(environment.idListPSMFinalizado)
  //     .subscribe({
  //       next: (data) => {
  //         console.log('Respuesta de la API:', data);
  //         this.cards = data;
  //       },
  //       error: (err) => {
  //         console.error('Error al obtener las tarjetas:', err);
  //       },
  //     });
  // }

  // getCardsProceso(): void {
  //   this.trelloService
  //     .getCardsByList(environment.idListPSMProceso)
  //     .subscribe({
  //       next: (d) => {
  //         console.log('Respuesta de la API:', d);
  //         this.cardsProcess = d;
  //       },
  //       error: (err) => {
  //         console.error('Error al obtener las tarjetas:', err);
  //       },
  //     });
  // }

  getCardsByList(
    idList: string,
    target: 'finalizado' | 'proceso' | 'pendiente'
  ): void {
    this.trelloService.getCardsByList(idList).subscribe({
      next: (data) => {
        // console.log(`Respuesta de la API para ${target}:`, data);

        // Asignar los datos a la propiedad correspondiente
        if (target === 'finalizado') {
          this.cards = data;
        } else if (target === 'proceso') {
          this.cardsProcess = data;
        } else if (target === 'pendiente') {
          this.cardsPendiente = data;
        }
      },
      error: (err) => {
        console.error(`Error al obtener las tarjetas para ${target}:`, err);
      },
    });
  }

  refresh(): void {
    this.router
      .navigateByUrl('/refresh', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([decodeURI(this._location.path())]);
      });
  }
}
