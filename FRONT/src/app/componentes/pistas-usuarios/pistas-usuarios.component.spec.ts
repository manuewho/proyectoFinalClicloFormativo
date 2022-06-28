import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PistasUsuariosComponent } from './pistas-usuarios.component';

describe('PistasUsuariosComponent', () => {
  let component: PistasUsuariosComponent;
  let fixture: ComponentFixture<PistasUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PistasUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PistasUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
