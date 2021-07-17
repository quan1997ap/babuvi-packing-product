import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDeliveryBillComponent } from './request-delivery-bill.component';

describe('RequestDeliveryBillComponent', () => {
  let component: RequestDeliveryBillComponent;
  let fixture: ComponentFixture<RequestDeliveryBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDeliveryBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDeliveryBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
