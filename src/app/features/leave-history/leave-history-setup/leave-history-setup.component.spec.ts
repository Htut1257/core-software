import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHistorySetupComponent } from './leave-history-setup.component';

describe('LeaveHistorySetupComponent', () => {
  let component: LeaveHistorySetupComponent;
  let fixture: ComponentFixture<LeaveHistorySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveHistorySetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveHistorySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
