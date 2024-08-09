import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaZonaComponent } from './tabla-zona.component';

describe('TablaZonaComponent', () => {
  let component: TablaZonaComponent;
  let fixture: ComponentFixture<TablaZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaZonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
