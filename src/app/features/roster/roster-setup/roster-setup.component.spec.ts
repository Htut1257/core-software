import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterSetupComponent } from './roster-setup.component';

describe('RosterSetupComponent', () => {
  let component: RosterSetupComponent;
  let fixture: ComponentFixture<RosterSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RosterSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
