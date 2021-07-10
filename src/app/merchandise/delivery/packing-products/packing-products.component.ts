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
    packageName: null,
    sumNetWeight: 0,
    products: [],
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
    this.products = JSON.parse(JSON.stringify(this.data.lsDetail));
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.productGrouped = [this.defaultPackage];
    this.packageIndexSelected = 0;
  }

  createPackage() {
    // this.merchandiseServices.createPackage()
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
    this.productGrouped.unshift(this.defaultPackage);
  }

  saveGr(i: number) {
    let saveParams = {
      lsId: this.productGrouped[i].products.map((item) => item.merchandiseId),
    };
    this.merchandiseServices.createPackage(saveParams).subscribe(
      (res) => {
        console.log(res);
        this.showMessage("success", "Lưu nhóm", res.result.message);
      },
      (error) => {
        this.showMessage("error", "Lưu nhóm", "Bạn chưa lưu được nhóm");
      }
    );
  }

  removeGr(i) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa gói?",
      accept: () => {
        this.merchandiseServices.deletePackage({}).subscribe(
          (res) => {
            console.log(res);
            this.products = this.products.concat(
              this.productGrouped[i].products
            );
            this.productGrouped[i].products = [];
            this.showMessage(
              "success",
              "Xóa nhóm",
              "Bạn đã xóa nhóm thành công"
            );
            this.checkSumNetWeight();
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
