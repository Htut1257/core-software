import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptHisSetupComponent } from './dept-his-setup.component';

describe('DeptHisSetupComponent', () => {
  let component: DeptHisSetupComponent;
  let fixture: ComponentFixture<DeptHisSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptHisSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptHisSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
