import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaListaPrecioComponent } from './plantilla-lista-precio.component';

describe('PlantillaListaPrecioComponent', () => {
  let component: PlantillaListaPrecioComponent;
  let fixture: ComponentFixture<PlantillaListaPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaListaPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaListaPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
