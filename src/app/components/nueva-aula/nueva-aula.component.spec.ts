import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaAulaComponent } from './nueva-aula.component';

describe('NuevaAulaComponent', () => {
  let component: NuevaAulaComponent;
  let fixture: ComponentFixture<NuevaAulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaAulaComponent ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
