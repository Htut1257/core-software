import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementSetupComponent } from './increment-setup.component';

describe('IncrementSetupComponent', () => {
  let component: IncrementSetupComponent;
  let fixture: ComponentFixture<IncrementSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncrementSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncrementSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
