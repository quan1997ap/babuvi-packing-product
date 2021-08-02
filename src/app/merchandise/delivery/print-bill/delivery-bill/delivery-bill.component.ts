import { APP_NAME } from 'app/config/app.config';
import { DeliveryRequest } from 'app/model/delivery-request.model';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
export class PackingProductBillDataModel{
  numOfBill?: number;
  deliveryRequest?: DeliveryRequest;
  sumRequestWeight?: number;
  deliveryRequestCode?: string;
  size?: string; // "full-size", "50x50",
  visible?: boolean;
  isDemo?: boolean;
}

@Component({
  selector: 'app-delivery-bill',
  templateUrl: './delivery-bill.component.html',
  styleUrls: ['./delivery-bill.component.scss', '../../../../../assets/styles/css/delivery-bill.css']
})
export class DeliveryBillComponent implements OnInit {
  colSelectedTables = [
    { name: "STT", id: "index" },
    { name: "Mã đơn hàng", id: "orderCode" },
    { name: "Mã kiện", id: "merchandiseCode" },
    { name: "Cân nặng", id: "netWeight" },
    { name: "Thể tích (kg)", id: "tt" },
    { name: "Quy đổi", id: "chargedWeight" },

  ];
  minWidth = Math.floor(Number(100 / this.colSelectedTables.length))
  APP_NAME = APP_NAME;
  currentTime = new Date();
  products = [];
  @Input() printData: PackingProductBillDataModel;
  defaultPackage = {
    sumNetWeight: 0,
    products: [],
    merchandiseWarehouseId: null, // id
    merchandiseCode: null
  };
  productGrouped = [];

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    setTimeout( () => {
      // console.log(this.printData);
      this.grParent();
    }, 1000)
  }


  grParent(){
    let deliveryRequest = this.printData.deliveryRequest;
    if(this.printData && deliveryRequest.lsParentDetail){
      this.products = deliveryRequest.lsDetail.filter( product => product.merchandiseWarehouseParentId == null);
      let lsParentDetail = deliveryRequest.lsParentDetail.sort( (a, b) => {
        if( a.merchandiseWarehouseId == null){
          return -99999;
        } else {
          return 0;
        }
      } )
      if(this.products && this.products.length == 0){
        lsParentDetail = lsParentDetail.filter( parent => parent.merchandiseWarehouseId != null)
      }
  
      let index = 1;
      this.productGrouped = lsParentDetail
      .map( parent => {
        let defaultParent = JSON.parse(JSON.stringify(this.defaultPackage));
        if( deliveryRequest.lsDetail && parent.merchandiseWarehouseId != null){
          defaultParent.products = deliveryRequest.lsDetail.filter( product => product.merchandiseWarehouseParentId == parent.merchandiseWarehouseId)
          defaultParent.products.forEach( product => {
            product['index'] = index;
            index++;
          })
        } else if(parent.merchandiseWarehouseId == null) {
          defaultParent.products = [];
        }
        if(parent.merchandiseWarehouseId == null){
          return defaultParent;
        } else {
          return { ...defaultParent, ...parent }
        }
      })
      this.checkSumNetWeight();
      // console.log(this.productGrouped)
    }
  }

  checkSumNetWeight() {
    this.productGrouped.forEach((group) => {
      if (group && group.products && group.products.length) {
        let sum = 0;
        group.products.forEach(product => {
          sum += product.netWeight
        });
        group.sumNetWeight = sum;
      } else {
        group.sumNetWeight = 0;
      }
    });
    this.cdr.detectChanges();
  }

  ngOnInit() {
  }

}
