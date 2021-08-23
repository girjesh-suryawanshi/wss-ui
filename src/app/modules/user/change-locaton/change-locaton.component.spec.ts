import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLocatonComponent } from './change-locaton.component';

describe('ChangeLocatonComponent', () => {
  let component: ChangeLocatonComponent;
  let fixture: ComponentFixture<ChangeLocatonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLocatonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLocatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
