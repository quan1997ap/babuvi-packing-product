

import { APP_NAME } from './../../../../config/app.config';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeliveryRequest } from './../../../../model/delivery-request.model';
import { Component, OnInit, Inject, Input } from '@angular/core';

export class DeliveryRequestBillDataModel{
  index: number;
  shipment: any;

}
@Component({
  selector: 'app-delivery-request-bill',
  templateUrl: './delivery-request-bill.component.html',
  styleUrls: ['./delivery-request-bill.component.scss']
})
export class DeliveryRequestBillComponent implements OnInit {
  APP_NAME = APP_NAME;
  @Input() printBillData: DeliveryRequestBillDataModel;
  
  constructor(
  ) {
    setTimeout( () => {
      console.log(this.printBillData)
    }, 3000)
  }

  ngOnInit() {
  }

}
