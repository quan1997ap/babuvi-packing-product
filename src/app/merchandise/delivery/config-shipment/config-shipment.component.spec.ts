import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigShipmentComponent } from './config-shipment.component';

describe('ConfigShipmentComponent', () => {
  let component: ConfigShipmentComponent;
  let fixture: ComponentFixture<ConfigShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
