import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingProductBillComponent } from './packing-product-bill.component';

describe('PackingProductBillComponent', () => {
  let component: PackingProductBillComponent;
  let fixture: ComponentFixture<PackingProductBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingProductBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingProductBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
