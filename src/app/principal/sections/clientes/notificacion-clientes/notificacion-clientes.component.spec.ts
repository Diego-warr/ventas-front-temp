import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionClientesComponent } from './notificacion-clientes.component';

describe('NotificacionClientesComponent', () => {
  let component: NotificacionClientesComponent;
  let fixture: ComponentFixture<NotificacionClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacionClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
