import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlantillaListaPrecioComponent } from './lista-plantilla-lista-precio.component';

describe('ListaPlantillaListaPrecioComponent', () => {
  let component: ListaPlantillaListaPrecioComponent;
  let fixture: ComponentFixture<ListaPlantillaListaPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPlantillaListaPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlantillaListaPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
