import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PintarAulasComponent } from './pintar-aulas.component';

describe('PintarAulasComponent', () => {
  let component: PintarAulasComponent;
  let fixture: ComponentFixture<PintarAulasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PintarAulasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PintarAulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
