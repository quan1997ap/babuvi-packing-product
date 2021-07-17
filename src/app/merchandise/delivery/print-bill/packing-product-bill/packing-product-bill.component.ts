import { APP_NAME } from './../../../../config/app.config';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeliveryRequest } from './../../../../model/delivery-request.model';
import { Component, OnInit, Inject, Input } from '@angular/core';

export class PackingProductBillDataModel{
  index: number;
  numOfBill: number;
  deliveryRequest: DeliveryRequest;
  merchandiseCode: string;
}
@Component({
  selector: 'app-packing-product-bill',
  templateUrl: './packing-product-bill.component.html',
  styleUrls: ['./packing-product-bill.component.scss']
})
export class PackingProductBillComponent implements OnInit {
  APP_NAME = APP_NAME;
  @Input() printBillData: PackingProductBillDataModel;
  
  constructor(
  ) {
    setTimeout( () => {
      console.log(this.printBillData)
    }, 3000)
  }

  ngOnInit() {
  }

}
