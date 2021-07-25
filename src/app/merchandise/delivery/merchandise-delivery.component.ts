import { ConfigShipmentComponent } from "./config-shipment/config-shipment.component";
import { PackingProductsComponent } from "./packing-products/packing-products.component";
import { Shipment } from "./../../model/shipment.model";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MerchandiseServices } from "app/services/merchandise.services";
import { DeliveryRequest } from "app/model/delivery-request.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ClientProfile } from "app/model/client-profile.model";
import { WarehouseExpService } from "app/services/warehouse-exp.service";
import { MatDialog } from "@angular/material/dialog";
import { PrintBillComponent } from "./print-bill/print-bill.component";
import { TransporterViewModel } from "app/model/transporter.model";
import { MessageService, ConfirmationService } from "primeng/api";
import { DataTable } from "primeng/primeng";

@Component({
  selector: "app-merchandise-delivery",
  templateUrl: "./merchandise-delivery.component.html",
  styleUrls: ["./merchandise-delivery.component.scss"],
  providers: [ConfirmationService],
})
export class MerchandiseDeliveryComponent implements OnInit {

  styleSheetFile = "assets/styles/css/print-gh-50-50.css";

  @ViewChild("dt") private dataTable: DataTable;
  @ViewChild("deliveryRequestInput") private deliveryRequestInput: ElementRef;
  
  expandedRows = {}; // { "id": 1 }

  isDisable = false;
  merchandiseList: any[];
  messages: any[];
  deliveryRequestCode: string;
  loading = false;
  deliveryRequest = new DeliveryRequest();
  oldShipment: Shipment[];
  needTopupAmount: any;
  parentMerchandiseCode: string;
  account: ClientProfile;
  userId: any;
  transporterPackageNumber: string = "";
  transporterName: string = "";
  editTransporter: boolean = false;
  lsTransporter: TransporterViewModel[] = [new TransporterViewModel()];

  symbolsLocation: string = "1";
  symbolsDisplay: string = "đ";

  indexOfDeliveryBillPrinting = null;

  displayedColumns: string[] = [
    "orderCode",
    "merchandiseCode",
    "netWeight",
    "capacity",
    "chargedWeight",
  ];
  dataSource = {
    rows: [],
    rowsFilter: [],
    rowGroupMetadata: {},
    grByField: "parentId",
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private merchandiseServices: MerchandiseServices,
    private warehouseExpService: WarehouseExpService,
    private messageService: MessageService,
    public dialog: MatDialog,
    public confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.account = JSON.parse(localStorage.getItem("userData"));
    this.userId = this.account.userId;
    this.getLsTransporter();
  }

  /**
   *
   * @param addOrUpdateShipment
   */

  addOrUpdateShipment(rowData) {
    this.indexOfDeliveryBillPrinting = null;
    let ParentMerchandiseWarehouseId = rowData[this.dataSource.grByField];
    let ParentMerchandise = this.deliveryRequest.lsParentDetail.find(
      (item) => item.merchandiseWarehouseId === ParentMerchandiseWarehouseId
    );

    const dialogRef = this.dialog.open(ConfigShipmentComponent, {
      width: "96%",
      height: "96%",
      maxWidth: "450px",
      maxHeight: "500px",
      disableClose: true,
      data: {
        ParentMerchandiseWarehouse: ParentMerchandise,
        lsTransporter: this.lsTransporter,
        deliveryRequest: this.deliveryRequest
      },
    });

    dialogRef.afterClosed().subscribe((resultUpdateShipment) => {
      if(resultUpdateShipment){
        this.messageService.add({
          severity: "success",
          summary: "Thông báo",
          detail: "Giao hàng thành công!",
        });
        this.getDeliveryRequestByCode(this.deliveryRequestCode);
      }
    });
  }

  cancelShipment(rowData) {
    this.indexOfDeliveryBillPrinting = null;
    let parentMerchandiseWarehouseId = rowData[this.dataSource.grByField];

    let shipmentId = null;
    let deliveryRequestId = null;
    let totalAmount = 0;
    let codAmount = 0;
    let transporterId = 0;
    let transporterPackageNumber = null;

    if(this.deliveryRequest){
      let parent = this.deliveryRequest.lsParentDetail.find( parent => parent.merchandiseWarehouseId == parentMerchandiseWarehouseId )
      if(parent){
        let shipment = parent.shipment ? parent.shipment: null;
        shipmentId = shipment.shipmentId ? shipment.shipmentId: null;
        totalAmount = shipment.totalAmount ? shipment.totalAmount: null;
        codAmount = shipment.codAmount ? shipment.codAmount: null;
        transporterId = shipment.transporterId ? shipment.transporterId : null;
        deliveryRequestId = shipment.deliveryRequestId ? shipment.deliveryRequestId : null;
        transporterPackageNumber = shipment.transporterPackageNumber ? shipment.transporterPackageNumber: null;
      }
    }

    let cancelShipmentParams = {
      parentMerchandiseWarehouseId: parentMerchandiseWarehouseId,
      TransporterPackageNumber: transporterPackageNumber,
      transporterId: transporterId,
      deliveryRequestId: deliveryRequestId,
      shipmentId: shipmentId,
      CodAmount: codAmount,
      TotalAmount: totalAmount
    }

    this.confirmationService.confirm({
      message: "Bạn có chắc muốn hủy giao hàng gói?",
      accept: () => {
        this.loading = true;
        this.merchandiseServices
          .deleteShipment(cancelShipmentParams)
          .subscribe(
            (res) => {
              if (res && res.result && res.result.success) {
                this.getDeliveryRequestByCode(this.deliveryRequestCode);
                this.messageService.add({severity:'success', summary:'Hủy giao hàng', detail:'Hủy giao hàng thành công'});
              } else {
                this.messageService.add({severity:'error', summary:'Hủy giao hàng', detail:  res.result.message });

              }
              this.loading = false;
            },
            (error) => {
              this.messageService.add({severity:'error', summary:'Hủy giao hàng', detail:  "Hủy giao hàng không thành công" });
              this.loading = false;
            }
          );
      },
    });
  }


  printDeliveryBill(rowIndex){
    this.indexOfDeliveryBillPrinting = null;
    setTimeout(() => {
      this.indexOfDeliveryBillPrinting = rowIndex;
    }, 500)
  }
  /**
   * Get delivery data by code
   * @param code
   */
  getDeliveryRequestByCode(code) {
    this.indexOfDeliveryBillPrinting = null;
    this.loading = true;
    this.messages = [];
    this.merchandiseServices
      .getDeliveryRequestByCode(code)
      .toPromise()
      .then((res) => {
        this.loading = false;
        if (res.result.success) {
          this.deliveryRequest = res.result.data;
          if (
            this.deliveryRequest &&
            this.deliveryRequest.shipment &&
            this.deliveryRequest.shipment.length > 0
          ) {
            this.transporterPackageNumber = this.deliveryRequest.shipment
              .map((e) => e.transporterPackageNumber)
              .join(", ");
            this.transporterName = this.deliveryRequest.shipment
              .map((e) => e.transporterName)
              .join(", ");
            this.oldShipment = this.deliveryRequest.shipment;
          } else {
            this.transporterPackageNumber = "";
            this.transporterName = "";
            this.deliveryRequest.shipment = [new Shipment()];
          }
          this.sortMerchandiseLsAndMergeParent();
        } else {
          this.deliveryRequest = new DeliveryRequest();
          this.showMessage("alert-danger", res.result.message);
        }
        this.expandAllTable();
      })
      .catch((error) => {
        this.loading = false;
        this.deliveryRequest = new DeliveryRequest();
        this.dataSource = {
          rows: [],
          rowsFilter: [],
          rowGroupMetadata: {},
          grByField: "parentId"
        }; 
        this.showMessage(
          "alert-danger",
          "Tải thông tin yêu cầu xuất hàng thất bại"
        );
      });
  }

  expandAllTable() {
    Object.keys(this.dataSource.rowGroupMetadata).forEach((key) => {
      this.expandedRows[key] = true;
    });
  }

  configPacking() {
    const dialogRef = this.dialog.open(PackingProductsComponent, {
      width: "96%",
      height: "96%",
      maxWidth: "1000px",
      maxHeight: "900px",
      disableClose: true,
      data: this.deliveryRequest,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getDeliveryRequestByCode(this.deliveryRequestCode);
      console.log(`Dialog result: ${result}`); // Pizza!
    });
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
   * Sort merchandise list
   */
  sortMerchandiseLsAndMergeParent() {
    let parent: any[];
    parent = this.deliveryRequest.lsParentDetail;
    const nullParent = this.deliveryRequest.lsParentDetail.find(
      (e) => e.merchandiseWarehouseId === null
    );
    if (!nullParent) {
      this.deliveryRequest.lsParentDetail = parent = [
        { merchandiseWarehouseId: null },
        ...parent,
      ];
    }
    this.merchandiseList = [];
    for (const p of parent) {
      p.isParrent = true;
      const merchandiseLsByParentId = this.deliveryRequest.lsDetail.filter(
        (e) => e.parentId === p.merchandiseWarehouseId
      );
      if (merchandiseLsByParentId.length > 0) {
        this.merchandiseList = [
          ...this.merchandiseList,
          ...merchandiseLsByParentId,
        ];
      }
    }

    this.dataSource.rows = JSON.parse(JSON.stringify(this.merchandiseList));
    this.dataSource.rowsFilter = JSON.parse(
      JSON.stringify(this.merchandiseList)
    );

    // make group rows
    this.updateRowGroupMetaData();
  }

  getMerchandiseInfor(list, merchandiseId) {
    // deliveryRequest.lsParentDetail
    let merchandiseFound = list.find(
      (item) => item.merchandiseWarehouseId === merchandiseId
    );
    if (merchandiseFound) {
      return merchandiseFound;
    } else {
      return {
        merchandiseCode: null,
        netWeight: null,
        paymentWeight: null,
      };
    }
  }

  /**
   * Fill merchandise list by parent merchandise code
   * @param value
   */
  applyFilter(value: string) {
    if (
      this.deliveryRequest &&
      this.deliveryRequest.lsParentDetail &&
      this.deliveryRequest.lsDetail
    ) {
      if (value) {
        const parent = this.deliveryRequest.lsParentDetail.find(
          (p) => p.merchandiseCode === value
        );

        let result = [];
        if (parent) {
          result = this.deliveryRequest.lsDetail.filter(
            (e) => e.parentId === parent.merchandiseWarehouseId
          );
        } else {
          result = this.deliveryRequest.lsDetail.filter(
            (e) => e.merchandiseCode == value
          );
        }

        this.dataSource.rowsFilter = result;
      } else {
        this.sortMerchandiseLsAndMergeParent();
      }
    }
  }

  /**
   *
   */
  updateRowGroupMetaData() {
    let grByField = this.dataSource.grByField;
    this.dataSource.rowGroupMetadata = {};
    if (this.dataSource.rows) {
      for (let i = 0; i < this.dataSource.rows.length; i++) {
        let rowData = this.dataSource.rows[i];
        let grFieldData = rowData[grByField];

        if (i == 0) {
          this.dataSource.rowGroupMetadata[grFieldData] = { index: 0, size: 1 };
        } else {
          let previousRowData = this.dataSource.rows[i - 1];
          let previousRowGroup = previousRowData[grByField];
          if (grFieldData == previousRowGroup) {
            this.dataSource.rowGroupMetadata[grFieldData].size++;
          } else
            this.dataSource.rowGroupMetadata[grFieldData] = {
              index: i,
              size: 1,
            };
        }
      }
    }

    // Expand Rows https://stackblitz.com/edit/primeng-turbo-table-u53rsg?file=app%2Fprovider-search%2Fprovider-search.component.ts
    Object.keys(this.dataSource.rowGroupMetadata).forEach((key) => {
      this.expandedRows[key] = true;
    });
  }

  /**
   * Payment order
   */
  paymentOrders() {
    // const orderIds = Array.from(new Set(this.deliveryRequest.lsDetail.map(e => e.orderId)));
    // const data = {
    //     orderIds :  orderIds,
    // };
    // this.dialog.open(PaymentOrdersComponent, {
    //     data: data,
    //     panelClass: 'payment-order-dialog',
    // }).afterClosed().subscribe((res) => {
    //     if (res) {
    //         this.showMessage('alert-success', 'Thanh toán thành công');
    //         this.getDeliveryRequestByCode(this.deliveryRequestCode);
    //     }
    // });
  }

  /**
   * Charge money to wallet
   */
  chargeWallet() {
    // TODO: Phase 2
  }

  /**
   * Create package
   */
  createPackage() {
    const lsDetail = this.deliveryRequest.lsDetail;
    const body = {
      lsId: lsDetail
        ? lsDetail
            .map((e) => e.merchandiseWarehouseId)
            .filter((a, b, self) => self.indexOf(a) === b)
        : [],
    };
    this.loading = true;
    this.merchandiseServices
      .createPackage(body)
      .toPromise()
      .then((res) => {
        this.loading = false;
        if (res.result.success) {
          // TODO: Load merchandise list
          this.getDeliveryRequestByCode(this.deliveryRequestCode);
          this.showMessage("alert-success", "Đóng gói thành công");
        } else {
          this.showMessage("alert-danger", res.result.message);
        }
      })
      .catch(() => {
        this.loading = false;
        this.showMessage("alert-danger", "Đóng gói thất bại");
      });
  }

  /**
   * Send delivery
   */
   finishShipment() {
    const body = {
      DeliveryRequestCode: this.deliveryRequestCode,
      UserId : this.userId
    };
    this.loading = true;
    this.merchandiseServices
      .finishShipment(body)
      .toPromise()
      .then((res) => {
        this.loading = false;
        if (res.result.success) {
          // TODO: set shipment value
          // this.deliveryRequestCode = null;
          // this.dataSource = {
          //   rows: [],
          //   rowsFilter: [],
          //   rowGroupMetadata: {},
          //   grByField: "parentId",
          // };
          // this.indexOfDeliveryBillPrinting = null;

          this.getDeliveryRequestByCode(this.deliveryRequestCode);
          this.deliveryRequestInput.nativeElement.focus();
          this.deliveryRequestInput.nativeElement.select();
          this.showMessage("alert-success", "Giao hàng thành công");

        } else {
          this.showMessage("alert-danger", res.result.message);
        }
      })
      .catch(() => {
        this.loading = false;
        this.showMessage("alert-danger", "Giao hàng thất bại");
      });
  }

  /**
   * Cancel delivery
   */
  cancelDelivery() {
    const body = {
      DeliveryRequestCode: this.deliveryRequestCode,
    };
    this.loading = true;
    this.merchandiseServices
      .cancelDelivery(body)
      .toPromise()
      .then((res) => {
        this.loading = false;
        if (res.result.success) {
          // TODO: reload data after success
          this.showMessage("alert-success", "Hủy giao thành công");
          this.getDeliveryRequestByCode(this.deliveryRequestCode);
        } else {
          this.showMessage("alert-danger", res.result.message);
        }
      })
      .catch(() => {
        this.loading = false;
        this.showMessage("alert-danger", "Hủy giao thất bại");
      });
  }

  /**
   * Export
   */
  exportByDeliveryRequest() {
    const body = {
      DeliveryRequestCode: this.deliveryRequestCode,
    };
    this.loading = true;
    this.warehouseExpService
      .createWarehouseExpByDeliveryRequest(body)
      .toPromise()
      .then((res) => {
        this.loading = false;
        if (res.result.success) {
          // TODO: reload data after success
          this.showMessage("alert-success", "Xuất hàng thành công");
          this.getDeliveryRequestByCode(this.deliveryRequestCode);
        } else {
          this.showMessage("alert-danger", res.result.message);
        }
      })
      .catch(() => {
        this.loading = false;
        this.showMessage("alert-danger", "Xuất hàng thất bại");
      });
  }

  /**
   * Cancel Export
   */
  cancelExp() {
    const body = {
      WarehouseExpCode:
        this.deliveryRequest && this.deliveryRequest.warehouseExp
          ? this.deliveryRequest.warehouseExp.warehouseExpCode
          : null,
    };
    this.loading = true;
    this.warehouseExpService
      .cancelWarehouseExp(body)
      .toPromise()
      .then((res) => {
        this.loading = false;
        if (res.result.success) {
          // TODO: reload data after success
          this.showMessage("alert-success", "Hủy xuất hàng thành công");
          this.getDeliveryRequestByCode(this.deliveryRequestCode);
        } else {
          this.showMessage("alert-danger", res.result.message);
        }
      })
      .catch(() => {
        this.loading = false;
        this.showMessage("alert-danger", "Xuất hàng thất bại");
      });
  }

  /**
   * Print bill
   */
  printExpBill() {
    const printData = {
      expCode:
        this.deliveryRequest && this.deliveryRequest.warehouseExp
          ? this.deliveryRequest.warehouseExp.warehouseExpCode
          : null,
      deliveryRequestCode: this.deliveryRequestCode,
      deliveryRequestId: this.deliveryRequest.deliveryRequestId,
    };
    this.dialog.open(PrintBillComponent, {
      data: printData,
      panelClass: "print-bill-dialog",
      minHeight: "300px",
      maxHeight: "400px",
      maxWidth: "500px",
      minWidth: "450px"
    });
  }

  changeTransporter() {
    // this.editTransporter = false;
    // this.loading = true;
    // this.merchandiseServices.updateShipment(
    //     this.deliveryRequest.shipment[0]
    //     ).toPromise().then((res) => {
    //   if (res.result.success) {
    //     this.transporterPackageNumber = this.deliveryRequest.shipment.map(e => e.transporterPackageNumber).join(', ')
    //     this.transporterName = this.deliveryRequest.shipment.map(e => e.transporterName).join(', ')
    //     this.messageService.add({ key: 'chitietcv', severity: 'success', summary: 'Thông báo', detail: "Cập nhật thành công!" });
    //     this.loading = false;
    //   } else {
    //     this.loading = false;
    //     this.deliveryRequest.shipment = this.oldShipment;
    //     this.messageService.add({ key: 'chitietcv', severity: 'error', summary: 'Thông báo', detail: res.result.message });
    //   }
    // })
  }

  /**
   * Ger list transporter
   */
  getLsTransporter() {
    this.merchandiseServices
      .getLsTransporter()
      .toPromise()
      .then((res) => {
        if (res.result.success) {
          this.lsTransporter = res.result.data;
          // đặt giá trị mặc định cho đơn vị vận chuyển
          //hiện tại đang fix 1 yêu cầu giao chỉ có một mã vận đơn --> sau này sẽ edit code
          this.deliveryRequest.shipment[0].transporterId =
            res.result.data[0].transporterId;
        } else {
          this.isDisable = true;
          this.showMessage("alert-danger", res.result.message);
        }
      })
      .catch(() => {
        this.isDisable = true;
        this.showMessage(
          "alert-danger",
          "Tải thông tin đơn vị vận chuyển thất bại"
        );
      });
  }

  money_format(sotien: number, kihieu, vitri) {
    let nStr = sotien == undefined ? "" : sotien.toString();
    let kq: string = "";
    if (sotien == undefined) {
      return kq;
    }
    nStr += "";
    let x = nStr.split(".");
    let x1 = x[0];
    let x2 = x.length > 1 ? "," + x[1] : "";
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "." + "$2");
    }
    kq = x1 + x2 + kihieu;
    switch (vitri) {
      case "1":
        kq = x1 + x2 + " " + kihieu;
        break;
      case "2":
        kq = kihieu + " " + x1 + x2;
    }

    return kq;
  }
}
