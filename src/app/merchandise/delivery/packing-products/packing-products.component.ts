import { MerchandiseServices } from "./../../../services/merchandise.services";
import { MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: "app-packing-products",
  templateUrl: "./packing-products.component.html",
  styleUrls: ["./packing-products.component.scss"],
})
export class PackingProductsComponent implements OnInit {
  selectedProducts = [];
  products = [];

  defaultPackage = {
    sumNetWeight: 0,
    products: [],
    merchandiseWarehouseId: null // id
  };
  productGrouped = [];

  packageIndexSelected = null;

  colSelectedTables = [
    { name: "Mã kiện", id: "merchandiseCode" },
    { name: "Cân nặng", id: "netWeight" },
  ];

  constructor(
    public dialogRef: MatDialogRef<PackingProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private merchandiseServices: MerchandiseServices,
    public cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    console.log(this.data);
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    if(this.data && this.data.lsParentDetail){
      this.products = this.data.lsDetail.filter( product => product.parentId == null)
      let lsParentDetail = this.data.lsParentDetail.sort( (a, b) => {
        if( a.merchandiseWarehouseId == null){
          return -99999;
        } else {
          return 0;
        }
      } )
      this.productGrouped = lsParentDetail
      .map( parent => {
        let defaultParent = JSON.parse(JSON.stringify(this.defaultPackage));
        if(this.data && this.data.lsDetail && parent.merchandiseWarehouseId != null){
          defaultParent.products = this.data.lsDetail.filter( product => product.parentId == parent.merchandiseWarehouseId)
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

      console.log( this.productGrouped )
    }
    this.packageIndexSelected = 0;
  }

  addProductToPackage() {
    this.productGrouped[this.packageIndexSelected].products =
      this.productGrouped[this.packageIndexSelected].products.concat(
        this.selectedProducts
      );
    let selectedProductIds = this.selectedProducts.map(
      (item) => item.merchandiseId
    );
    this.products = this.products.filter(
      (item) => !selectedProductIds.includes(item.merchandiseId)
    );
    this.selectedProducts = [];
    this.checkSumNetWeight();
    this.cdr.detectChanges();
  }

  addGroup() {
    this.productGrouped.unshift(JSON.parse(JSON.stringify(this.defaultPackage)));
    this.packageIndexSelected = 0;
  }

  saveGr(i: number) {
    let saveParams = {
      lsId: this.productGrouped[i].products.map((item) => item.merchandiseWarehouseId),
    };
    this.merchandiseServices.createPackage(saveParams).subscribe(
      (res) => {
        console.log(res);
        if(res && res.result && res.result.success){
          this.checkSumNetWeight();
          if(this.products && this.products.length){
            this.addGroup();
          }
          this.showMessage("success", "Lưu nhóm", res.result.message);
        } else {
          this.showMessage("error", "Lưu nhóm", res.result.message);          
        }
      },
      (error) => {
        this.showMessage("error", "Lưu nhóm", "Bạn chưa lưu được nhóm");
      }
    );

  }

  printGr(i){

  }

  removeGr(i) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa gói?",
      accept: () => {
        this.merchandiseServices.deletePackage({
          DeliveryRequestId : this.data.deliveryRequestId,
          ParentMerchandiseWarehouseId :  this.productGrouped[i].merchandiseWarehouseId
        }).subscribe(
          (res) => {
            console.log(res);
            if(res && res.result && res.result.success){
              this.productGrouped.splice( i, 1 )
              this.showMessage(
                "success",
                "Xóa nhóm",
                "Bạn đã xóa nhóm thành công"
              );
              this.checkSumNetWeight();
              // this.showMessage("success", "Xóa nhóm", res.result.message);
            } else {
              this.showMessage("error", "Xóa nhóm", res.result.message);          
            }
          },
          (error) => {
            this.showMessage("error", "Lưu nhóm", "Bạn chưa lưu được nhóm");
          }
        );
      },
    });
  }

  showMessage(severity, summary, detail) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
    setTimeout(() => {
      this.messageService.clear();
    }, 3000);
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
  }
}
