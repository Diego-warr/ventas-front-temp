import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarClientesComponent } from './asignar-clientes.component';

describe('AsignarClientesComponent', () => {
  let component: AsignarClientesComponent;
  let fixture: ComponentFixture<AsignarClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarClientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
