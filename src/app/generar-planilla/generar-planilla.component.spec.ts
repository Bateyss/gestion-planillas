import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarPlanillaComponent } from './generar-planilla.component';

describe('GenerarPlanillaComponent', () => {
  let component: GenerarPlanillaComponent;
  let fixture: ComponentFixture<GenerarPlanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarPlanillaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
