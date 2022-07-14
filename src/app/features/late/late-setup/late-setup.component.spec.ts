import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateSetupComponent } from './late-setup.component';

describe('LateSetupComponent', () => {
  let component: LateSetupComponent;
  let fixture: ComponentFixture<LateSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LateSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
