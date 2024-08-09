import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGrupoPrecioComponent } from './tabla-grupo-precio.component';

describe('TablaGrupoPrecioComponent', () => {
  let component: TablaGrupoPrecioComponent;
  let fixture: ComponentFixture<TablaGrupoPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaGrupoPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaGrupoPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
