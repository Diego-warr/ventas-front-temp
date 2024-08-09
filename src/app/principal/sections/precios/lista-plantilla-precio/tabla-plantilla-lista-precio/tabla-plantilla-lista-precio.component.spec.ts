import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPlantillaListaPrecioComponent } from './tabla-plantilla-lista-precio.component';

describe('TablaPlantillaListaPrecioComponent', () => {
  let component: TablaPlantillaListaPrecioComponent;
  let fixture: ComponentFixture<TablaPlantillaListaPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPlantillaListaPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPlantillaListaPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
