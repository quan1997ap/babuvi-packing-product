import { MerchandiseServices } from "./../../../services/merchandise.services";
import { MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-config-shipment",
  templateUrl: "./config-shipment.component.html",
  styleUrls: ["./config-shipment.component.scss"],
})
export class ConfigShipmentComponent implements OnInit {
  isLoading = false;
  shipmentForm: FormGroup;
  lsTransporter: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<ConfigShipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private merchandiseServices: MerchandiseServices,
    public cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {
    console.log(this.data);
    this.lsTransporter = this.data.lsTransporter.map(
     transporter => ({ name: transporter.name , value: transporter.transporterId }) 
    );
    console.log( this.lsTransporter )
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
    this.shipmentForm = this.fb.group({
      ParentMerchandiseWarehouseId: [
        this.data.ParentMerchandiseWarehouse.merchandiseWarehouseId,
        Validators.required,
      ],
      transporterId: [this.lsTransporter[0].value, Validators.required],
      // deliveryRequestId: [null],
      CodAmount: [null, Validators.required],
      TotalAmount: [null, Validators.required],
    });

  }

  ngOnInit() {}

  addOrUpdateShipment() {
    let shipmentInfor = this.shipmentForm.value;
    shipmentInfor.CodAmount = Number(shipmentInfor.CodAmount);
    shipmentInfor.TotalAmount = Number(shipmentInfor.TotalAmount);

    this.merchandiseServices.addOrUpdateShipment(shipmentInfor).subscribe(
      (res) => {
        console.log(res);
        if (res.result.success) {
          this.messageService.add({
            key: "shipment",
            severity: "success",
            summary: "Thông báo",
            detail: "Giao hàng thành công!",
          });
        } else {
          this.messageService.add({
            key: "shipment",
            severity: "error",
            summary: "Thông báo",
            detail: res.result.message,
          });
        }
      },
      (err) => {
        this.messageService.add({
          key: "shipment",
          severity: "error",
          summary: "Thông báo",
          detail: "Giao hàng không thành công!",
        });
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
