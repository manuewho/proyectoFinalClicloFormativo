import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarUsComponent } from './actualizar-us.component';

describe('ActualizarUsComponent', () => {
  let component: ActualizarUsComponent;
  let fixture: ComponentFixture<ActualizarUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
