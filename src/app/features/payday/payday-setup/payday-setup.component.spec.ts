import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaydaySetupComponent } from './payday-setup.component';

describe('PaydaySetupComponent', () => {
  let component: PaydaySetupComponent;
  let fixture: ComponentFixture<PaydaySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaydaySetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaydaySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
