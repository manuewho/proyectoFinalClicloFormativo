import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliComponent } from './eli.component';

describe('EliComponent', () => {
  let component: EliComponent;
  let fixture: ComponentFixture<EliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
