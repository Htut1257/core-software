import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSetupComponent } from './job-setup.component';

describe('JobSetupComponent', () => {
  let component: JobSetupComponent;
  let fixture: ComponentFixture<JobSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
