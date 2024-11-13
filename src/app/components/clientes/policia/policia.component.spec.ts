import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciaComponent } from './policia.component';

describe('PoliciaComponent', () => {
  let component: PoliciaComponent;
  let fixture: ComponentFixture<PoliciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoliciaComponent]
    });
    fixture = TestBed.createComponent(PoliciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
