import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaZonaComponent } from './lista-zona.component';

describe('ListaZonaComponent', () => {
  let component: ListaZonaComponent;
  let fixture: ComponentFixture<ListaZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaZonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
