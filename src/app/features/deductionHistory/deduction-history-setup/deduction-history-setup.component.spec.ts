import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionHistorySetupComponent } from './deduction-history-setup.component';

describe('DeductionHistorySetupComponent', () => {
  let component: DeductionHistorySetupComponent;
  let fixture: ComponentFixture<DeductionHistorySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeductionHistorySetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionHistorySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
