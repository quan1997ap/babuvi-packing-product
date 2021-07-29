import { MerchandiseServices } from "./../../../services/merchandise.services";
import { MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { PackingProductBillDataModel } from "../print-bill/packing-product-bill/packing-product-bill.component";

@Component({
  selector: "app-packing-products",
  templateUrl: "./packing-products.component.html",
  styleUrls: ["./packing-products.component.scss"],
  providers: [ConfirmationService],
})
export class PackingProductsComponent implements OnInit {
  @ViewChild('filterGlobalProduct') filterGlobalProduct: ElementRef;
  searchPrTxt = '';

  styleSheetFile = "assets/styles/css/print-ycgh-50-50.css";

  isLoading = false;
  selectedProducts = [];
  products = [];

  defaultPackage = {
    sumNetWeight: 0,
    products: [],
    merchandiseWarehouseId: null, // id
    merchandiseCode: null,
  };

  productGrouped = [];
  productGroupedFilter = [];

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
    // console.log(this.data);
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data && this.data.lsParentDetail) {
      this.products = this.data.lsDetail.filter(
        (product) => product.parentId == null
      );
      let lsParentDetail = this.data.lsParentDetail.sort((a, b) => {
        if (a.merchandiseWarehouseId == null) {
          return -99999;
        } else {
          return 0;
        }
      });
      if (this.products && this.products.length == 0) {
        lsParentDetail = lsParentDetail.filter(
          (parent) => parent.merchandiseWarehouseId != null
        );
      }

      this.productGrouped = lsParentDetail.map((parent) => {
        let defaultParent = JSON.parse(JSON.stringify(this.defaultPackage));
        if (
          this.data &&
          this.data.lsDetail &&
          parent.merchandiseWarehouseId != null
        ) {
          defaultParent.products = this.data.lsDetail.filter(
            (product) => product.parentId == parent.merchandiseWarehouseId
          );
        } else if (parent.merchandiseWarehouseId == null) {
          defaultParent.products = [];
        }
        if (parent.merchandiseWarehouseId == null) {
          return defaultParent;
        } else {
          return { ...defaultParent, ...parent };
        }
      });
      this.checkSumNetWeight();
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
    this.productGrouped.unshift(
      JSON.parse(JSON.stringify(this.defaultPackage))
    );
    this.packageIndexSelected = 0;
  }

  saveGr(i: number) {
    let saveParams = {
      DeliveryRequestId: this.data.deliveryRequestId,
      lsId: this.productGrouped[i].products.map(
        (item) => item.merchandiseWarehouseId
      ),
    };
    this.isLoading = true;
    this.merchandiseServices.createPackage(saveParams).subscribe(
      (res) => {
        console.log(res);
        if (res && res.result && res.result.success) {
          this.productGrouped[i].merchandiseWarehouseId =
            res.result.data.merchandiseWarehouseId;
          this.productGrouped[i].merchandiseCode =
            res.result.data.merchandiseCode;
          this.productGrouped[i].merchandiseId = res.result.data.merchandiseId;
          this.checkSumNetWeight();
          if (this.products && this.products.length) {
            this.addGroup();
          }
          this.showMessage("success", "Lưu nhóm", "Bạn đã đóng gói kiện hàng thành công");
        } else {
          this.showMessage(
            "error",
            "Lưu nhóm",
            "Không thể đóng gói kiện hàng"
          );
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.showMessage("error", "Lưu nhóm", "Bạn chưa lưu được nhóm");
      }
    );
  }

  printGr(i) {
    this.isLoading = false;
  }

  removeProductInGr(i, merchandiseWarehouseId, merchandiseId, productIndex, countProduct) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa kiện đang chọn không ?",
      accept: () => {

        if (merchandiseWarehouseId) {
          this.isLoading = true;
          this.merchandiseServices
            .deletePackageDetail({
              DeliveryRequestId: this.data.deliveryRequestId,
              ParentMerchandiseWarehouseId:
                this.productGrouped[i].merchandiseWarehouseId,
                ChildMerchandiseWarehouseId : merchandiseId
            })
            .subscribe(
              (res) => {
                if (res && res.result && res.result.success) {
                  this.products.push(this.productGrouped[i].products[productIndex]);
                  this.productGrouped[i].products.splice(productIndex, 1);
                  this.checkSumNetWeight();
                  this.showMessage(
                    "success",
                    "Xóa nhóm",
                    "Bạn đã xóa kiện thành công"
                  );

                  if(countProduct == 1){
                    this.productGrouped.splice(i, 1);
                    if (this.productGrouped && this.productGrouped.length == 0) {
                      this.addGroup();
                    } else if (
                      this.productGrouped.filter(
                        (item) => item.merchandiseWarehouseId == null
                      ).length == 0
                    ) {
                      this.addGroup();
                    }
                  }

                } else {
                  this.showMessage("error", "Xóa kiện", res.result.message);
                }
                this.isLoading = false;
              },
              (error) => {
                this.isLoading = false;
                this.showMessage("error", "Xóa kiện", "Bạn chưa xóa được kiện");
              }
            );
        } else {
          this.products.push(this.productGrouped[i].products[productIndex]);
          this.productGrouped[i].products.splice(productIndex, 1);
          if(countProduct == 1){
            this.productGrouped.splice(i, 1);
            if (this.productGrouped && this.productGrouped.length == 0) {
              this.addGroup();
            } else if (
              this.productGrouped.filter(
                (item) => item.merchandiseWarehouseId == null
              ).length == 0
            ) {
              this.addGroup();
            }
          }
        }
      },
    });
  }

  
  removeGr(i, merchandiseWarehouseId) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa gói?",
      accept: () => {
        if (merchandiseWarehouseId) {
          this.isLoading = true;
          this.merchandiseServices
            .deletePackage({
              DeliveryRequestId: this.data.deliveryRequestId,
              ParentMerchandiseWarehouseId:
                this.productGrouped[i].merchandiseWarehouseId,
            })
            .subscribe(
              (res) => {
                if (res && res.result && res.result.success) {
                  this.products = this.products.concat(
                    this.productGrouped[i].products
                  );
                  this.productGrouped.splice(i, 1);
                  if (this.productGrouped && this.productGrouped.length == 0) {
                    this.addGroup();
                  } else if (
                    this.productGrouped.filter(
                      (item) => item.merchandiseWarehouseId == null
                    ).length == 0
                  ) {
                    this.addGroup();
                  }
                  this.checkSumNetWeight();
                  this.showMessage(
                    "success",
                    "Xóa nhóm",
                    "Bạn đã xóa nhóm thành công"
                  );
                } else {
                  this.showMessage("error", "Xóa nhóm", res.result.message);
                }
                this.isLoading = false;
              },
              (error) => {
                this.isLoading = false;
                this.showMessage("error", "Lưu nhóm", "Bạn chưa lưu được nhóm");
              }
            );

        } else {
          this.products = this.products.concat(this.productGrouped[i].products);
          this.productGrouped.splice(i, 1);
          if (this.productGrouped && this.productGrouped.length == 0) {
            this.addGroup();
          } else if (
            this.productGrouped.filter(
              (item) => item.merchandiseWarehouseId == null
            ).length == 0
          ) {
            this.addGroup();
          }
        }
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
        group.products.forEach((product) => {
          sum += product.netWeight;
        });
        group.sumNetWeight = sum;
      } else {
        group.sumNetWeight = 0;
      }
    });
  }

  addProductToGr(dt, merchandiseCode) {

    let productSelected = this.products.filter(
      (item) => item.merchandiseCode == merchandiseCode
    );

    if (productSelected && productSelected.length) {
      this.productGrouped[this.packageIndexSelected].products =
        this.productGrouped[this.packageIndexSelected].products.concat(
          productSelected
        );

      this.products = this.products.filter(
        (item) => item.merchandiseCode !== merchandiseCode
      );
      this.selectedProducts = this.selectedProducts.filter(
        (item) => item.merchandiseCode !== merchandiseCode
      );
      this.checkSumNetWeight();
      this.cdr.detectChanges();
      this.filterGlobalProduct.nativeElement.value = '';
      dt.filter('', 'merchandiseCode' ,'contains' );
    }
  }

}
