import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GHorasComponent } from './g-horas.component';

describe('GHorasComponent', () => {
  let component: GHorasComponent;
  let fixture: ComponentFixture<GHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GHorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
