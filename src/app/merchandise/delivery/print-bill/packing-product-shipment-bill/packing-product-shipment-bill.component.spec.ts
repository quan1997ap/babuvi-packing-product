import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingProductShipmentBillComponent } from './packing-product-shipment-bill.component';

describe('PackingProductShipmentBillComponent', () => {
  let component: PackingProductShipmentBillComponent;
  let fixture: ComponentFixture<PackingProductShipmentBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingProductShipmentBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingProductShipmentBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
