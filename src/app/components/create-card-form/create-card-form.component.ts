import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrelloService } from '../../services/trello.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-create-card-form',
  templateUrl: './create-card-form.component.html',
  styleUrls: ['./create-card-form.component.css'],
})
export class CreateCardFormComponent {
  cardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private trelloService: TrelloService,
  ) {
    this.cardForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      desc: [''],

    });
  }

  onSubmit() {
    this.postTarjetaTrelloClientUno()
  }

  postTarjetaTrelloClientUno(){
    if (this.cardForm.invalid) {
      alert('Por favor, completa correctamente el formulario.');
      return;
    }

    const { name, desc, idMembers: any  } = this.cardForm.value;
    
    const idList = environment.idListPCSM; 
    const idMembers= environment.idMembers
    
    this.trelloService.createCard(idList, name, desc,idMembers).subscribe({
      next: (response) => {
        console.log('Tarjeta creada:', response);
        alert('¡Tarjeta creada con éxito!');
        this.cardForm.reset();
      },
      error: (error) => {
        console.error('Error al crear la tarjeta:', error);
        alert('Hubo un error al crear la tarjeta.');
      },
    });
  }
}
