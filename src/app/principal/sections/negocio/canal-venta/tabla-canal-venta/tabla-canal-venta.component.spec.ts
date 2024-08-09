import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanalVentaComponent } from './tabla-canal-venta.component';

describe('CanalVentaComponent', () => {
  let component: CanalVentaComponent;
  let fixture: ComponentFixture<CanalVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanalVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanalVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
