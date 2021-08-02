import { NgxSpinnerService } from "ngx-spinner";
import { MerchandiseServices } from "app/services/merchandise.services";
import {
  Component,
  Inject,
  OnInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DeliveryRequest } from "app/model/delivery-request.model";
import { PrintService } from "app/services/print.service";
import { WarehouseExp } from "app/model/warehouse-exp.model";
import { APP_NAME } from "app/config/app.config";

@Component({
  selector: "app-print-bill",
  templateUrl: "./print-bill.component.html",
  styleUrls: ["./print-bill.component.scss"],
})
export class PrintBillComponent implements OnInit {
  @ViewChild("print") print!: ElementRef;

  APP_NAME = APP_NAME;
  messages: any[];
  expCode: any;
  deliveryRequestCode: any;
  deliveryRequestId: any;
  expData: WarehouseExp = new WarehouseExp();
  shipData: any;
  deliveryRequest: DeliveryRequest = new DeliveryRequest();
  sumExpWeight: number = 0;
  sumRequestWeight: number = 0;

  styleSheetFiles = "/assets/styles/css/print-bill.css";
  styleRequestDeliveryBillFile = "/assets/styles/css/request-delivery-bill.css";
  styleDeliveryBillFile = "/assets/styles/css/delivery-bill.css";

  printTypes = [
    {
      label: "In phiếu xuất hàng",
      value: {
        id: 1,
        printSectionId: "delivery-bill-grouped",
        style: this.styleDeliveryBillFile,
      },
    },
    {
      label: "In phiếu yêu cầu giao hàng",
      value: {
        id: 2,
        printSectionId: "request-delivery-bill-full-size",
        style: this.styleRequestDeliveryBillFile,
      },
    },
    {
      label: "In phiếu yêu cầu giao hàng 50x50",
      value: {
        id: 3,
        printSectionId: "request-delivery-bill-50x50",
        style: this.styleRequestDeliveryBillFile,
      },
    },
    {
      label: "Demo with params",
      value: {
        id: 4,
        printSectionId: "delivery-bill-grouped", // "request-delivery-bill-demo",
        style: this.styleDeliveryBillFile,
      },
    },
  ];
  billSelected = this.printTypes[0].value;

  types = [];
  typeSelected = null;

  fromDate = null;
  toDate = null;

  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private printService: PrintService,
    public merchandiseServices: MerchandiseServices,
    private spinner: NgxSpinnerService
  ) {
    if (this.dialogData.expCode == null) {
      this.printTypes = this.printTypes.filter( item => [1,4].includes(item.value.id) == false)
    }
  }

  ngOnInit() {}

  printBill() {
    if( this.billSelected && [1,4].includes(this.billSelected.id ) ){
      if (this.dialogData.expCode) {
        this.expCode = this.dialogData.expCode;
        this.printWarehouseExp(this.expCode);
      }
    }

    // if (this.dialogData.deliveryRequestId) {
    //   this.deliveryRequestId = this.dialogData.deliveryRequestId;
    //   this.printShipByDeliveryRequest(this.deliveryRequestId);
    // }

    if( this.billSelected && [2,3].includes(this.billSelected.id ) ){
      if (this.dialogData.deliveryRequestCode) {
        this.deliveryRequestCode = this.dialogData.deliveryRequestCode;
        this.printDeliveryRequest(this.deliveryRequestCode);
      }
    }
  }
  /**
   * Show message
   * @param messageClass = bootstrap alert class
   * @param detail
   */
  showMessage(messageClass: string, detail: string): void {
    this.messages = [];
    this.messages.push({ messageClass: messageClass, detail });
    setTimeout(() => {
      this.messages = [];
    }, 3000);
  }

  /**
   * Load export print data by exp code
   * @param expCode
   */
  printWarehouseExp(expCode) {
    this.spinner.show();
    this.loading = true;
    this.printService
      .printWarehouseExp(expCode)
      .toPromise()
      .then((res) => {
        if (res.result.success) {
          this.deliveryRequest = res.result.data;
          this.sumRequestWeight = this.sumWeightOfRequestList();
          setTimeout(() => {
            this.print.nativeElement.click();
            this.spinner.hide();
            this.loading = false;
          }, 2000);
        } else {
          this.deliveryRequest = new DeliveryRequest();
          this.showMessage("alert-danger", res.result.message);
          this.spinner.hide();
          this.loading = false;
        }
      })
      .catch(() => {
        this.spinner.hide();
        this.showMessage(
          "alert-danger",
          "Không lấy được thông tin phiếu yêu cầu giao hàng"
        );
      });
  }

  /**
   * Get shipping information
   * @param expCode
   */
  printShipByDeliveryRequest(deliveryRequestId) {
    this.printService
      .printShipByDeliveryRequest(deliveryRequestId)
      .toPromise()
      .then((res) => {
        if (res.result.success) {
          this.shipData = res.result.data;
        } else {
          this.showMessage("alert-danger", res.result.message);
        }
      })
      .catch(() => {
        this.showMessage(
          "alert-danger",
          "Không lấy được thông tin phiếu vận đơn"
        );
      });
  }

  /**
   * Get delivery information
   * @param deliveryCode
   */
  printDeliveryRequest(deliveryCode) {
    this.spinner.show();
    this.loading = true;
    // this.merchandiseServices.getDeliveryRequestByCode(deliveryCode)
    this.printService.printDeliveryRequest(deliveryCode)
      .toPromise()
      .then((res) => {
        if (res.result.success) {
          this.deliveryRequest = res.result.data;
          this.sumRequestWeight = this.sumWeightOfRequestList();
          setTimeout(() => {
            this.print.nativeElement.click();
            this.spinner.hide();
            this.loading = false;
          }, 2000);
        } else {
          this.deliveryRequest = new DeliveryRequest();
          this.showMessage("alert-danger", res.result.message);
          this.spinner.hide();
          this.loading = false;
        }
      })
      .catch(() => {
        this.spinner.hide();
        this.showMessage(
          "alert-danger",
          "Không lấy được thông tin phiếu yêu cầu giao hàng"
        );
      });
  }

  /**
   * Sum weight of ls detail
   */
  sumWeightOfExpList() {
    if (this.expData.lsDetail && this.expData.lsDetail.length > 0) {
      return this.expData.lsDetail.reduce(
        (a, b) => a + (parseFloat(b["paymentWeight"]) || 0),
        0
      );
    } else {
      return 0;
    }
  }

  /**
   * Sum weight of ls detail
   */
  sumWeightOfRequestList() {
    if (
      this.deliveryRequest.lsDetail &&
      this.deliveryRequest.lsDetail.length > 0
    ) {
      return this.deliveryRequest.lsDetail.reduce(
        (a, b) => a + (parseFloat(b["paymentWeight"]) || 0),
        0
      );
    } else {
      return 0;
    }
  }
}
