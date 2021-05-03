import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaciltyeventsComponent } from './faciltyevents.component';

describe('FaciltyeventsComponent', () => {
  let component: FaciltyeventsComponent;
  let fixture: ComponentFixture<FaciltyeventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaciltyeventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaciltyeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
