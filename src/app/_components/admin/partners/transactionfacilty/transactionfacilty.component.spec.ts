import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionfaciltyComponent } from './transactionfacilty.component';

describe('TransactionfaciltyComponent', () => {
  let component: TransactionfaciltyComponent;
  let fixture: ComponentFixture<TransactionfaciltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionfaciltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionfaciltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
