import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionHorasComponent } from './confirmacion-horas.component';

describe('ConfirmacionHorasComponent', () => {
  let component: ConfirmacionHorasComponent;
  let fixture: ComponentFixture<ConfirmacionHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionHorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
