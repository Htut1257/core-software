import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobHistorySetupComponent } from './job-history-setup.component';

describe('JobHistorySetupComponent', () => {
  let component: JobHistorySetupComponent;
  let fixture: ComponentFixture<JobHistorySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobHistorySetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobHistorySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
