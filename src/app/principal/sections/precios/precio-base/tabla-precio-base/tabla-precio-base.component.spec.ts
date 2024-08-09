import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPrecioBaseComponent } from './tabla-precio-base.component';

describe('TablaPrecioBaseComponent', () => {
  let component: TablaPrecioBaseComponent;
  let fixture: ComponentFixture<TablaPrecioBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPrecioBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPrecioBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
