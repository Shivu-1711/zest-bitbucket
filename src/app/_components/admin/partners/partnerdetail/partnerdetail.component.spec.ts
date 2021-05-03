import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerdetailComponent } from './partnerdetail.component';

describe('PartnerdetailComponent', () => {
  let component: PartnerdetailComponent;
  let fixture: ComponentFixture<PartnerdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
