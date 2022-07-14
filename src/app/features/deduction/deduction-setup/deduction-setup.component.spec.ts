import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionSetupComponent } from './deduction-setup.component';

describe('DeductionSetupComponent', () => {
  let component: DeductionSetupComponent;
  let fixture: ComponentFixture<DeductionSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeductionSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
