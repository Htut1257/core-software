import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusSetupComponent } from './bonus-setup.component';

describe('BonusSetupComponent', () => {
  let component: BonusSetupComponent;
  let fixture: ComponentFixture<BonusSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonusSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
