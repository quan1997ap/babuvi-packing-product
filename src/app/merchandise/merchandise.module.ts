import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MerchandiseRoutes } from "./merchandise.routing";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgxPrintModule } from "ngx-print";
import { NgxBarcodeModule } from "ngx-barcode";
import { PrintService } from "app/services/print.service";
import { ShareCommonModule } from "../common/share-common.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { InputTextModule } from "primeng/inputtext";
//service
import { WarehouseExpService } from "app/services/warehouse-exp.service";
import { MerchandiseServices } from "app/services/merchandise.services";
import { SystemService } from "app/services/system.services";
//component
import { MerchandiseDeliveryComponent } from "./delivery/merchandise-delivery.component";
import { PrintBillComponent } from "./delivery/print-bill/print-bill.component";
//primeng service
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
//primeng
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { DialogModule } from "primeng/dialog";
import { PackingProductsComponent } from "./delivery/packing-products/packing-products.component";
import { RadioButtonModule } from "primeng/radiobutton";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ConfigShipmentComponent } from './delivery/config-shipment/config-shipment.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxSpinnerModule } from "ngx-spinner";
import { PackingProductBillComponent } from './delivery/print-bill/packing-product-bill/packing-product-bill.component';
import { DeliveryBillComponent } from './delivery/print-bill/delivery-bill/delivery-bill.component';
import { RequestDeliveryBillComponent } from './delivery/print-bill/request-delivery-bill/request-delivery-bill.component';
import { DeliveryRequestBillComponent } from './delivery/print-bill/delivery-request-bill/delivery-request-bill.component';

@NgModule({
  imports: [
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MerchandiseRoutes),
    NgxDatatableModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPrintModule,
    NgxBarcodeModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    CheckboxModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressSpinnerModule,
    ShareCommonModule,
    DialogModule,
    MatToolbarModule,
    MatIconModule,
    InputTextModule,
    RadioButtonModule,
    MessagesModule,
    MatTooltipModule
  ],
  declarations: [
    MerchandiseDeliveryComponent,
    PrintBillComponent,
    PackingProductsComponent,
    ConfigShipmentComponent,
    PackingProductBillComponent,
    DeliveryBillComponent,
    RequestDeliveryBillComponent,
    DeliveryRequestBillComponent,
  ],
  providers: [
    MerchandiseServices,
    WarehouseExpService,
    PrintService,
    ConfirmationService,
    SystemService,
    MessageService,
    MessageModule,
  ],
  entryComponents: [PackingProductsComponent, PrintBillComponent, ConfigShipmentComponent],
})
export class MerchandiseModule {}
