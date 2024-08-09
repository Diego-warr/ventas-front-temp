import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaNegocioComponent } from './tabla-linea-negocio.component';

describe('LineaNegocioComponent', () => {
  let component: LineaNegocioComponent;
  let fixture: ComponentFixture<LineaNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineaNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
