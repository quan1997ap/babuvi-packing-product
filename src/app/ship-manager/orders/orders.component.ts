import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ShipManagerService } from 'app/services/ship-manager.service';
import { ClientProfile } from 'app/model/client-profile.model';
import { ShipOrders } from 'app/model/ship-orders.model';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { PassDataService } from 'app/services/pass-data.services';
import { Message } from 'primeng/api';
import { ConfirmDialogModel } from 'app/model/confirm-dialog.model';
import { ConfirmDialogComponent } from 'app/common-view/confirm-dialog/confirm-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  ELEMENT_DATA: ShipOrders[] = [];
  @ViewChild('paginator') paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'name', 'symbol'];
  // dataSource = ELEMENT_DATA;
  dataSource: MatTableDataSource<ShipOrders>;
  account: ClientProfile;
  _shipOrders: ShipOrders[];
  msgs: Message[] = [];

  dataCount: number;
  pageSize: number;
  listBtn: any = [];
  currentStatus: any = null;
  linkImg: string = '';
  isOpenLargeImg: boolean = false;
  StartDate: any = '';
  EndDate: any = '';
  dropdownStatus: any = { statusDisplay: "Tất cả đơn" };
  dataItem: any = {dataCount:0, totalAmount:0, totalMissing:0}
  maxPage: number;
  pages = [];
  numbPage: number = 1;

  constructor(
              private route: ActivatedRoute,
              private _passData: PassDataService,
              private _shipManager: ShipManagerService,
              private router: Router,
              public dialog: MatDialog) {
                this._passData.loading(true);
              }
  detectWidthLayout: boolean = true;
  detectWidthLayoutSm: boolean = true;
  ngOnInit() {

    if (window.innerWidth <= 800) {
      this.detectWidthLayout = false
    } else {
      this.detectWidthLayout = true
    }

    if (window.innerWidth <= 800) {
      this.detectWidthLayoutSm = false
    } else {
      this.detectWidthLayoutSm = true
    }

    this.account = JSON.parse(localStorage.getItem('userData'));
    // this._shipOrders = new ShipOrders();
    this._shipOrders = [];
    this.dataSource = new MatTableDataSource<ShipOrders>();
    this.getDataFromServer();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 800) {
      this.detectWidthLayout = false
    } else {
      this.detectWidthLayout = true
    }
    if (window.innerWidth <= 500) {
      this.detectWidthLayoutSm = false
    } else {
      this.detectWidthLayoutSm = true
    }
  }

  nullForm = {
    "OrderCode": null,
    "ShopName": null,
    "StartDate": null,
    "EndDate": null,
    "Status": null
  }

  getDataFromServer() {
    this._passData.loading(true);
    this._shipManager.getListOrders(this.nullForm, 1, 5).subscribe(res => {
      if (res.result.success) {
        this.dataItem = res.result.data;
        // page
        this.dataCount = this.dataItem.dataCount;
        // data
        this._shipOrders = res.result.data.lsData;
        this.maxPage = res.result.data.pageCount;
        this.dataSource.data = res.result.data.lsData;
        if (this.maxPage > 5) { this.pages = [1, 2, 3, 4, 5]; } else {
          for (let i = 1; i <= this.maxPage; i++) {
            this.pages.push(i);
          }
        }
        //status
        this.listBtn = res.result.data.groupStatus;
        this.listBtn.sort(function(a, b) {
          return a.ord - b.ord;
        });
      } else {
        this.showMessage(res.result.message, 'danger');
      }
      this._passData.loading(false);
    }, error => {
      this._passData.loading(false);
    });
  }

  /*filter() và changeFilter() mang hàm ý giống nhau, filter() của button trên PC, changeFilter của Dropdown trên mobile */
  filter(status) {
    //console.log(status.status)
    this.currentStatus = status.status;
    this.nullForm.Status = status.status;
    this.dropdownStatus = status; //dòng này để đồng bộ các nút với dropdown.nút chỉ hiển thị ở PC, drop dơn hiển thị ở mobile
    this.loadDataFromServerPerPage(1);
  }
  changeFilter() {
    console.log(this.dropdownStatus)
    this.currentStatus = this.dropdownStatus.status;
    this.nullForm.Status = this.dropdownStatus.status;
    this.loadDataFromServerPerPage(1);
  }

  OpenImage(link) {
    this.linkImg = link;
    this.isOpenLargeImg = true;
  }
  FuncLoc(formLoc) {
    let form = formLoc.value;
    if (form.StartDate != "") { form.StartDate = formatDate(form.StartDate, 'yyyy-MM-dd', 'en-US') }
    if (form.EndDate != "") { form.EndDate = formatDate(form.EndDate, 'yyyy-MM-dd', 'en-US') }
    for (let key in form) {
      if (form[key] == "") { form[key] = null }
      if (form['StartDate'] == "1970-01-01") { form['StartDate'] = "" }
      if (form['EndDate'] == "1970-01-01") { form['EndDate'] = "" }
    }
    form.Status = this.nullForm.Status
    this.nullForm = form;
    this.loadDataFromServerPerPage(1);
  }

  ResetForm(formLoc) {
    formLoc.onReset();
  }

  returnLinkOrder:string;

  redirectAtag(data: ShipOrders) {
    //this._passData.loading(true);
    //this._passData.setOrders(data);
    //console.log(data);
    //this.router.navigate(['ship-manager/detail-orders/'], { queryParams: { orderId: data.orderId } });
    this.returnLinkOrder = window.location.href.replace(this.router.url,`/ship-manager/detail-orders?orderId=${data.orderId}`);
  }

  redirect(data: ShipOrders) {
    this._passData.loading(true);
    this._passData.setOrders(data);
    this.router.navigate(['ship-manager/detail-orders/'], { queryParams: { orderId: data.orderId } });
    //this.returnLinkOrder = window.location.href.replace(this.router.url,`/ship-manager/detail-orders?orderId=${data.orderId}`);
  }

  cancelOrder(item: any, inx: number) {
    const message = 'Bạn có muốn Hủy'
      const dialogData = new ConfirmDialogModel('Xóa', message)
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: dialogData,
        panelClass: 'confirm-dialog'
      });
      dialogRef.afterClosed().subscribe(
        dialogresult => {
          this._passData.loading(true);
          if (dialogresult) {
            this._shipManager.cancelOrder(item.orderId).subscribe(res => {
              if (res.result.success) {
                this.showMessage('Hủy đơn hàng thành công', 'success');
                this._shipOrders[inx] = res.result.data;
              } else {
                this.showMessage(res.result.message, 'error');
              }
            }, err => {
              this.showMessage('Hủy đơn hàng thất bại', 'error');
            });
          }
          this._passData.loading(false);
        },
        error => {
          this.showMessage('Hủy đơn hàng thất bại', 'error');
          this._passData.loading(false);
        }
      )
  }

  clear() {
    this.msgs = [];
  }

  showMessage(str: string, type: string) {
    var _self = this;
    _self.msgs = [];
    _self.msgs.push({ severity: type, summary: str, detail: '' });
    setTimeout(function () {
      _self.clear();
    }, 10000);
  }
  
  async selectPage(value) {
    this._passData.loading(true);
    let maxPage = this.maxPage

    if (value > 0) {
      await this.loadDataFromServerPerPage(value)
      this.numbPage = value;
    }
    if (value == 'n') {
      if (maxPage == this.numbPage) { this._passData.loading(false);; return }
      else {
        this.numbPage++
        await this.loadDataFromServerPerPage(this.numbPage)
      }
    }
    if (value == 'p') {
      if (this.numbPage == 1) { this._passData.loading(false);; return }
      else {
        this.numbPage--;
        await this.loadDataFromServerPerPage(this.numbPage)
      }
    }
    if (value == 'l') {
      this.numbPage = maxPage
      await this.loadDataFromServerPerPage(maxPage)
    }
    if (value == 'f') {
      this.numbPage = 1;
      await this.loadDataFromServerPerPage(1);
    }
    await 1;console.log(this.maxPage)
    if (this.numbPage > 5) {console.log(1)
      this.pages = [this.numbPage - 2, this.numbPage - 1, this.numbPage, this.numbPage + 1, this.numbPage + 2];
      if (this.numbPage + 2 > this.maxPage) {
        this.pages = [this.numbPage - 3, this.numbPage - 2, this.numbPage - 1, this.numbPage, this.numbPage + 1];
        console.log(this.pages)
      }
      if (this.numbPage + 1 > this.maxPage) {
        this.pages = [this.numbPage - 4, this.numbPage - 3, this.numbPage - 2, this.numbPage - 1, this.numbPage ];
        console.log(this.pages)
      }
    } else {
      this.pages = [];
      for (let i = 1; i <= this.maxPage; i++) {
       this.pages.push(i);
      }
      if (this.maxPage > 4) {
        this.pages = [];
        this.pages = [1, 2, 3, 4, 5];
        if(this.numbPage == 4 && this.maxPage >= 6){ this.pages = [2,3,4,5,6]}
        if(this.numbPage == 5 && this.maxPage >= 7){ this.pages = [3,4,5,6,7]}
      }
      console.log(this.pages)
    }
  };

  async loadDataFromServerPerPage(numb) {
    this._passData.loading(true);
    await this._shipManager.getListOrders(this.nullForm, numb, 5).subscribe( async res => {
      if (res.result.success) {
        this.dataItem = res.result.data;
        // page
        this.dataCount = this.dataItem.dataCount;
        this.maxPage = await this.dataItem.pageCount
        // data
        this._shipOrders = res.result.data.lsData;
        this.dataSource.data = res.result.data.lsData;

        //status
        this.listBtn = res.result.data.groupStatus;
        this.listBtn.sort(function(a, b) {
          return a.ord - b.ord;
        });
      } else {
        this.showMessage(res.result.message, 'danger');
      }
      this._passData.loading(false);
    }, error => {
      this._passData.loading(false);
    });
  }

}
