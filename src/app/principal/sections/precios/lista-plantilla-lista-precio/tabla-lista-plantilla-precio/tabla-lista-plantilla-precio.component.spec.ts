import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListaPlantillaPrecioComponent } from './tabla-lista-plantilla-precio.component';

describe('TablaListaPlantillaPrecioComponent', () => {
  let component: TablaListaPlantillaPrecioComponent;
  let fixture: ComponentFixture<TablaListaPlantillaPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaListaPlantillaPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListaPlantillaPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
