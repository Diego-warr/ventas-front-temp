import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlantillaPrecioComponent } from './lista-plantilla-precio.component';

describe('ListaPlantillaPrecioComponent', () => {
  let component: ListaPlantillaPrecioComponent;
  let fixture: ComponentFixture<ListaPlantillaPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPlantillaPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlantillaPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
