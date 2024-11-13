import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteccionCivilMarinoComponent } from './proteccion-civil-marino.component';

describe('ProteccionCivilMarinoComponent', () => {
  let component: ProteccionCivilMarinoComponent;
  let fixture: ComponentFixture<ProteccionCivilMarinoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProteccionCivilMarinoComponent]
    });
    fixture = TestBed.createComponent(ProteccionCivilMarinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
