import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDefaultLayoutComponent } from './main-default-layout.component';

describe('MainDefaultLayoutComponent', () => {
  let component: MainDefaultLayoutComponent;
  let fixture: ComponentFixture<MainDefaultLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDefaultLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDefaultLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
