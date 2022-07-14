import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusHisComponent } from './bonus-his.component';

describe('BonusHisComponent', () => {
  let component: BonusHisComponent;
  let fixture: ComponentFixture<BonusHisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusHisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonusHisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
