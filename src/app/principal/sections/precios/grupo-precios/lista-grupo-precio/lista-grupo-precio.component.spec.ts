import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGrupoPrecioComponent } from './lista-grupo-precio.component';

describe('ListaGrupoPrecioComponent', () => {
  let component: ListaGrupoPrecioComponent;
  let fixture: ComponentFixture<ListaGrupoPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGrupoPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGrupoPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
