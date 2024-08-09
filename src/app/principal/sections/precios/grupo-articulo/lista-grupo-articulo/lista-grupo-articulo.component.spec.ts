import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGrupoArticuloComponent } from './lista-grupo-articulo.component';

describe('ListaGrupoArticuloComponent', () => {
  let component: ListaGrupoArticuloComponent;
  let fixture: ComponentFixture<ListaGrupoArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGrupoArticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGrupoArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
