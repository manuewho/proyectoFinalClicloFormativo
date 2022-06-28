import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPistaComponent } from './nueva-pista.component';

describe('NuevaPistaComponent', () => {
  let component: NuevaPistaComponent;
  let fixture: ComponentFixture<NuevaPistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaPistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
