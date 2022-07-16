import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftSwappingSetupComponent } from './shift-swapping-setup.component';

describe('ShiftSwappingSetupComponent', () => {
  let component: ShiftSwappingSetupComponent;
  let fixture: ComponentFixture<ShiftSwappingSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftSwappingSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftSwappingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
