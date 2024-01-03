import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PintarClaseComponent } from './pintar-clase.component';

describe('PintarClaseComponent', () => {
  let component: PintarClaseComponent;
  let fixture: ComponentFixture<PintarClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PintarClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PintarClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
