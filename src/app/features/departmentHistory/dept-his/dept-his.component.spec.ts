import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptHisComponent } from './dept-his.component';

describe('DeptHisComponent', () => {
  let component: DeptHisComponent;
  let fixture: ComponentFixture<DeptHisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptHisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptHisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
