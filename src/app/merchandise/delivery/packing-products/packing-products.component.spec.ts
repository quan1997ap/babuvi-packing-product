import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingProductsComponent } from './packing-products.component';

describe('PackingProductsComponent', () => {
  let component: PackingProductsComponent;
  let fixture: ComponentFixture<PackingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
