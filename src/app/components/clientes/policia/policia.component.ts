import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrelloService } from 'src/app/services/trello.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-policia',
  templateUrl: './policia.component.html',
  styleUrls: ['./policia.component.css'],
})
export class PoliciaComponent {
  combinedForm: FormGroup;
  createdCardId: string | null = null;

  constructor(private fb: FormBuilder, private trelloService: TrelloService) {
    this.combinedForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      desc: [''],
      comment: [''],
    });
  }

  onSubmit() {
    this.createCard()
  }

  // Create card

  createCard(){
    if (this.combinedForm.invalid) {
      alert('Por favor, completa correctamente el formulario.');
      return;
    }

    const { name, desc, comment } = this.combinedForm.value;
    const idList = environment.idListPSM;

    // Crear tarjeta en Trello
    this.trelloService.createCard(idList, name, desc).subscribe({
      next: (response) => {
        console.log('Tarjeta creada:', response);
        this.createdCardId = response.id;
        alert('¡Tarjeta creada con éxito!');

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
    this.trelloService.addCommentToCard(cardId, comment).subscribe({
      // next: () => {
      //   console.log('Comentario añadido con éxito.');
      //   alert('¡Comentario añadido con éxito!');
      // },
      // error: (error) => {
      //   console.error('Error al añadir comentario:', error);
      //   alert('Hubo un error al añadir el comentario.');
      // },
    });
  }
}
