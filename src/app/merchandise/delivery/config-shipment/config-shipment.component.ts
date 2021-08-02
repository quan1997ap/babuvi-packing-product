import { MerchandiseServices } from "./../../../services/merchandise.services";
import { MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-config-shipment",
  templateUrl: "./config-shipment.component.html",
  styleUrls: ["./config-shipment.component.scss"],
})
export class ConfigShipmentComponent implements OnInit {
  isLoading = false;
  shipmentForm: FormGroup;
  transporters: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<ConfigShipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private merchandiseServices: MerchandiseServices,
    public cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.transporters = this.data.lsTransporter.map((transporter) => ({
      label: transporter.name,
      value: transporter.transporterId,
    }));

    this.initForm();
  }

  initForm() {
    /**
     *
       DeliveryRequestId : ParentMerchandise.DeliveryRequestId,
      ParentMerchandiseWarehouseId: ParentMerchandiseWarehouseId,
      ShipmentId:ParentMerchandise.ShipmentId,
      TransporterId: ParentMerchandise.TransporterId,
      TransporterPackageNumber: ParentMerchandise.TransporterPackageNumber,
      CodAmount: ParentMerchandise.CodAmount,
      CouponCode: ParentMerchandise.CouponCode,
      TotalAmount: ParentMerchandise.CouponCode
     */


    let shipmentId = null;
    let deliveryRequestId = null;
    let totalAmount = null;
    let codAmount = null;
    let transporterId = null;
    let parentMerchandiseWarehouseId = null;
    let transporterPackageNumber = null;


    if (this.data.ParentMerchandiseWarehouse.merchandiseWarehouseId) {
      deliveryRequestId = this.data.deliveryRequest.deliveryRequestId;
      parentMerchandiseWarehouseId = this.data.ParentMerchandiseWarehouse.merchandiseWarehouseId;
      let shipment = this.data.ParentMerchandiseWarehouse.shipment;

      if(shipment){
      
        shipmentId = shipment.shipmentId;
        totalAmount = shipment.totalAmount;
        codAmount = shipment.codAmount;
        transporterId = shipment.transporterId;
        transporterPackageNumber = shipment.transporterPackageNumber;
      } else {
        transporterId = this.transporters[0].value;
      }
    }

    this.shipmentForm = new FormGroup({
      ParentMerchandiseWarehouseId: new FormControl( null, Validators.required),
      TransporterPackageNumber: new FormControl(null),
      TransporterId: new FormControl(null, Validators.required),
      DeliveryRequestId: new FormControl(null),
      ShipmentId: new FormControl(null),
      CodAmount: new FormControl(null),
      TotalAmount: new FormControl(null),
    });

    this.shipmentForm.patchValue(
      {
         ParentMerchandiseWarehouseId: parentMerchandiseWarehouseId,
         DeliveryRequestId: deliveryRequestId,
         TransporterId : transporterId,
         TransporterPackageNumber: transporterPackageNumber,
         ShipmentId: shipmentId,
         CodAmount: codAmount,
         TotalAmount: totalAmount
       }
    )

  }

  ngOnInit() {}

  addOrUpdateShipment() {
    let shipmentInfor = this.shipmentForm.value;
    shipmentInfor.CodAmount = Number(shipmentInfor.CodAmount);
    shipmentInfor.TotalAmount = Number(shipmentInfor.TotalAmount);
    this.spinner.show();
    this.merchandiseServices.addOrUpdateShipment(shipmentInfor).subscribe(
      (res) => {
        if (res.result.success) {
          this.spinner.hide();
          this.dialogRef.close(res.result.data);
        } else {
          this.messageService.add({
            key: "shipment",
            severity: "error",
            summary: "Thông báo",
            detail: res.result.message,
          });
          this.spinner.hide();
        }
      },
      (err) => {
        this.messageService.add({
          key: "shipment",
          severity: "error",
          summary: "Thông báo",
          detail: "Giao hàng không thành công!",
        });
        this.spinner.hide();
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
