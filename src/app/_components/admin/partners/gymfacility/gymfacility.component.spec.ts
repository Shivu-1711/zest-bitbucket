import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymfacilityComponent } from './gymfacility.component';

describe('GymfacilityComponent', () => {
  let component: GymfacilityComponent;
  let fixture: ComponentFixture<GymfacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymfacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymfacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
