import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLineaNegocioComponent } from './lista-linea-negocio.component';

describe('ListaLineaNegocioComponent', () => {
  let component: ListaLineaNegocioComponent;
  let fixture: ComponentFixture<ListaLineaNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLineaNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaLineaNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
