import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveOpeningSetupComponent } from './leave-opening-setup.component';

describe('LeaveOpeningSetupComponent', () => {
  let component: LeaveOpeningSetupComponent;
  let fixture: ComponentFixture<LeaveOpeningSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveOpeningSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveOpeningSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
