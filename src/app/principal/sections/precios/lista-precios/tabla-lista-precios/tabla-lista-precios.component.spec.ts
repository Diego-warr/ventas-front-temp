import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListaPreciosComponent } from './tabla-lista-precios.component';

describe('TablaListaPreciosComponent', () => {
  let component: TablaListaPreciosComponent;
  let fixture: ComponentFixture<TablaListaPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaListaPreciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListaPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
