import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRequestBillComponent } from './delivery-request-bill.component';

describe('DeliveryRequestBillComponent', () => {
  let component: DeliveryRequestBillComponent;
  let fixture: ComponentFixture<DeliveryRequestBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryRequestBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRequestBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
