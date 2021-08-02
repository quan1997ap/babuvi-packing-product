import { PrintService } from './../../../../services/print.service';
import { APP_NAME } from './../../../../config/app.config';
import { Component, OnInit, Inject, Input, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

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
  styleSheetFile = "assets/styles/css/print-gh-50-50.css";
  @ViewChild("printDelivery") printDelivery!: ElementRef;

  APP_NAME = APP_NAME;
  @Input() printBillData: DeliveryRequestBillDataModel;
  dataPrint = null;
  constructor(
    private printService: PrintService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) {
    this.spinner.show();
    setTimeout( () => {
      // console.log(this.printBillData)
     this.setPrintData();
    }, 1000);
  }

  setPrintData(){
    this.printService.printShipmentById(this.printBillData.shipment['shipmentId']).subscribe((res: any) => {
      this.dataPrint = res.result.data;
      // console.log(this.dataPrint)
      setTimeout( () => {
        this.printDelivery.nativeElement.click();
      }, 500);
      this.spinner.hide();
    }, 
    err => {
      this.showToast('error', 'Thất bại', 'Không lấy được dữ liệu');
    })
  }

  ngOnInit() {
  }

  showToast(type: string, summary: string, detail: string) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: 4000 });
    setTimeout(function () {
      this.msgs = [];
    }, 4000);
  }

}
