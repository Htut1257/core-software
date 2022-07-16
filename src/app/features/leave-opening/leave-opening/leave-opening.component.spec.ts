import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveOpeningComponent } from './leave-opening.component';

describe('LeaveOpeningComponent', () => {
  let component: LeaveOpeningComponent;
  let fixture: ComponentFixture<LeaveOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveOpeningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
