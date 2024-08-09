import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCanalVentaComponent } from './lista-canal-venta.component';

describe('ListaCanalVentaComponent', () => {
  let component: ListaCanalVentaComponent;
  let fixture: ComponentFixture<ListaCanalVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCanalVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCanalVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
