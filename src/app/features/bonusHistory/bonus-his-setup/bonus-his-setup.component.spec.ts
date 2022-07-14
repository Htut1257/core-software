import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusHisSetupComponent } from './bonus-his-setup.component';

describe('BonusHisSetupComponent', () => {
  let component: BonusHisSetupComponent;
  let fixture: ComponentFixture<BonusHisSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusHisSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonusHisSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
