import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCorreoNotificacionComponent } from './lista-correo-notificacion.component';

describe('ListaCorreoNotificacionComponent', () => {
  let component: ListaCorreoNotificacionComponent;
  let fixture: ComponentFixture<ListaCorreoNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCorreoNotificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCorreoNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
