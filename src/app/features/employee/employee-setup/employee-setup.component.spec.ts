import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSetupComponent } from './employee-setup.component';

describe('EmployeeSetupComponent', () => {
  let component: EmployeeSetupComponent;
  let fixture: ComponentFixture<EmployeeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
