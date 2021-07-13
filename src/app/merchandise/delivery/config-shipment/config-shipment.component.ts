import { MerchandiseServices } from "./../../../services/merchandise.services";
import { MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-config-shipment',
  templateUrl: './config-shipment.component.html',
  styleUrls: ['./config-shipment.component.scss']
})
export class ConfigShipmentComponent implements OnInit {
  isLoading = false;
  shipmentForm : FormGroup;
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
    this.initForm();
  }

  initForm(){
    /**
     *   DeliveryRequestId : ParentMerchandise.DeliveryRequestId,
      ParentMerchandiseWarehouseId: ParentMerchandiseWarehouseId,
      ShipmentId:ParentMerchandise.ShipmentId,
      TransporterId: ParentMerchandise.TransporterId,
      TransporterPackageNumber: ParentMerchandise.TransporterPackageNumber,
      CodAmount: ParentMerchandise.CodAmount,
      CouponCode: ParentMerchandise.CouponCode,
      TotalAmount: ParentMerchandise.CouponCode
     */
    this.shipmentForm = this.fb.group({
      ParentMerchandiseWarehouseId : ['', Validators.required ],
      CodAmount: [null, Validators.required ],
      TotalAmount: [null, Validators.required ]
    });
  }


  ngOnInit() {
  }


  close() {
    this.dialogRef.close();
  }

}
