import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMobileNumberComponent } from './change-mobile-number.component';

describe('ChangeMobileNumberComponent', () => {
  let component: ChangeMobileNumberComponent;
  let fixture: ComponentFixture<ChangeMobileNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMobileNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMobileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
