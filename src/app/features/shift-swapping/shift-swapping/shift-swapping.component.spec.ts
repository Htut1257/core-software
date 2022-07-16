import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSwappingComponent } from './shift-swapping.component';

describe('ShiftSwappingComponent', () => {
  let component: ShiftSwappingComponent;
  let fixture: ComponentFixture<ShiftSwappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftSwappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftSwappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
