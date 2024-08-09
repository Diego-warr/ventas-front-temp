import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrecioBaseComponent } from './lista-precio-base.component';

describe('ListaPrecioBaseComponent', () => {
  let component: ListaPrecioBaseComponent;
  let fixture: ComponentFixture<ListaPrecioBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPrecioBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPrecioBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
