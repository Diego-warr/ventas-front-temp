import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGrupoArticuloComponent } from './tabla-grupo-articulo.component';

describe('TablaGrupoArticuloComponent', () => {
  let component: TablaGrupoArticuloComponent;
  let fixture: ComponentFixture<TablaGrupoArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaGrupoArticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaGrupoArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
