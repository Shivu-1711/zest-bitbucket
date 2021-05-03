import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionpartnerComponent } from './transactionpartner.component';

describe('TransactionpartnerComponent', () => {
  let component: TransactionpartnerComponent;
  let fixture: ComponentFixture<TransactionpartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionpartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionpartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
