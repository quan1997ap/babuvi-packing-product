import { APP_NAME } from 'app/config/app.config';
import { DeliveryRequest } from 'app/model/delivery-request.model';
import { Component, Input, OnInit } from '@angular/core';
export class PackingProductBillDataModel{
  numOfBill?: number;
  deliveryRequest?: DeliveryRequest;
  sumRequestWeight?: number;
  deliveryRequestCode?: string;
  size?: string; // "full-size", "50x50"
  visible?: boolean;
}

@Component({
  selector: 'app-request-delivery-bill',
  templateUrl: './request-delivery-bill.component.html',
  styleUrls: ['./request-delivery-bill.component.scss']
})
export class RequestDeliveryBillComponent implements OnInit {
  APP_NAME = APP_NAME;
  @Input() printData: PackingProductBillDataModel;
  
  constructor(
  ) {
    setTimeout( () => {
      console.log(this.printData)
    }, 3000)
  }


  ngOnInit() {
  }

}
