import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySetupComponent } from './city-setup.component';

describe('CitySetupComponent', () => {
  let component: CitySetupComponent;
  let fixture: ComponentFixture<CitySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitySetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
