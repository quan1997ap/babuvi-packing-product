import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DeliveryRequest} from "app/model/delivery-request.model";
import {PrintService} from "app/services/print.service";
import {WarehouseExp} from "app/model/warehouse-exp.model";
import { APP_NAME } from 'app/config/app.config';

@Component({
  selector: 'app-print-bill',
  templateUrl: './print-bill.component.html',
  styleUrls: ['./print-bill.component.scss']
})
export class PrintBillComponent implements OnInit {
  APP_NAME = APP_NAME;
  messages: any[];
  loading: boolean[] = [];
  expCode: any;
  deliveryRequestCode: any;
  deliveryRequestId: any;
  isDisable: boolean[] = [];
  expData: WarehouseExp = new WarehouseExp();
  shipData: any;
  deliveryRequest: DeliveryRequest = new DeliveryRequest();
  sumExpWeight: number = 0;
  sumRequestWeight: number = 0;
  symbolsLocation: string = '1';
  symbolsDisplay: string = 'đ';
  styleSheetFiles = "/assets/styles/css/print-bill.css";
  printDelay = 0;
  constructor(
      @Inject(MAT_DIALOG_DATA) private dialogData: any,
      private printService: PrintService,
      ) {
  }

  ngOnInit() {
    if (this.dialogData.expCode) {
      this.expCode = this.dialogData.expCode;
      this.printWarehouseExp(this.expCode);
    } else {
      this.isDisable['exp'] = true;
    }

    if (this.dialogData.deliveryRequestId) {
      this.deliveryRequestId = this.dialogData.deliveryRequestId;
      this.printShipByDeliveryRequest(this.deliveryRequestId);
    } else {
      this.isDisable['ship'] = true;
    }

    if (this.dialogData.deliveryRequestCode) {
      this.deliveryRequestCode = this.dialogData.deliveryRequestCode;
      this.printDeliveryRequest(this.deliveryRequestCode);
    } else {
      this.isDisable['request'] = true;
    }
  }

  /**
   * Show message
   * @param messageClass = bootstrap alert class
   * @param detail
   */
  showMessage(messageClass: string, detail: string): void {
    this.messages = [];
    this.messages.push({messageClass: messageClass, detail});
    setTimeout(() => {
      this.messages = [];
    }, 3000);
  }

  /**
   * Load export print data by exp code
   * @param expCode
   */
  printWarehouseExp(expCode) {
    this.loading['exp'] = true;
    this.printService.printWarehouseExp(expCode).toPromise()
        .then(res => {
          this.loading['exp'] = false;
          if (res.result.success) {
            this.expData = res.result.data;
            this.sumExpWeight = this.sumWeightOfExpList();
          } else {
            this.isDisable['exp'] = true;
            this.showMessage('alert-danger', res.result.message);
          }
        })
        .catch(() => {
          this.loading['exp'] = false;
          this.isDisable['exp'] = true;
          this.showMessage('alert-danger', 'Không lấy được thông tin phiếu xuất hàng');
        });
  }

  /**
   * Get shipping information
   * @param expCode
   */
  printShipByDeliveryRequest(deliveryRequestId) {
    this.loading['ship'] = true;
    this.printService.printShipByDeliveryRequest(deliveryRequestId).toPromise()
        .then(res => {
          this.loading['ship'] = false;
          if (res.result.success) {
            this.shipData = res.result.data;
            console.log("this.shipData");
            console.log(this.shipData);
          } else {
            this.isDisable['ship'] = true;
            this.showMessage('alert-danger', res.result.message);
          }
        })
        .catch(() => {
          this.loading['ship'] = false;
          this.isDisable['ship'] = true;
          this.showMessage('alert-danger', 'Không lấy được thông tin phiếu vận đơn');
        });
  }

  /**
   * Get delivery information
   * @param deliveryCode
   */
  printDeliveryRequest(deliveryCode) {
    this.loading['request'] = true;
    this.printService.printDeliveryRequest(deliveryCode).toPromise()
        .then(res => {
          this.loading['request'] = false;
          if (res.result.success) {
            this.deliveryRequest = res.result.data;
            this.sumRequestWeight = this.sumWeightOfRequestList();
          } else {
            this.isDisable['request'] = true;
            this.showMessage('alert-danger', res.result.message);
          }
        })
        .catch(() => {
          this.loading['request'] = false;
          this.isDisable['request'] = true;
          this.showMessage('alert-danger', 'Không lấy được thông tin phiếu yêu cầu giao hàng');
        });
  }

  /**
   * Sum weight of ls detail
   */
  sumWeightOfExpList() {
    if (this.expData.lsDetail && this.expData.lsDetail.length > 0) {
      return this.expData.lsDetail.reduce((a, b) => a + (parseInt(b['paymentWeight']) || 0), 0);
    } else {
      return 0;
    }
  }


  /**
   * Sum weight of ls detail
   */
  sumWeightOfRequestList() {
    if (this.deliveryRequest.lsDetail && this.deliveryRequest.lsDetail.length > 0) {
      return this.deliveryRequest.lsDetail.reduce((a, b) => a + (parseInt(b['paymentWeight']) || 0), 0);
    } else {
      return 0;
    }
  }
}
