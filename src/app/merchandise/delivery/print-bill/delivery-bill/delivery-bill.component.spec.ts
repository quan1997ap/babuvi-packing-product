import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryBillComponent } from './delivery-bill.component';

describe('DeliveryBillComponent', () => {
  let component: DeliveryBillComponent;
  let fixture: ComponentFixture<DeliveryBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
