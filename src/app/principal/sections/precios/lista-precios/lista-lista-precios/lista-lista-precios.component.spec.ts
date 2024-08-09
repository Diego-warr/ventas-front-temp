import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaListaPreciosComponent } from './lista-lista-precios.component';

describe('ListaListaPreciosComponent', () => {
  let component: ListaListaPreciosComponent;
  let fixture: ComponentFixture<ListaListaPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaListaPreciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaListaPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
