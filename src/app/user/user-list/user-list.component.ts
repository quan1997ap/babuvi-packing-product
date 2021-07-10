import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';
import { ReceiptService } from 'app/services/receipt.services';
import { SystemService } from 'app/services/system.services';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [
      UserService,
      SystemService
    ]
})
export class UserListComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private userService: UserService,
    private systemService: SystemService,
    private router: Router,
    private messageService: MessageService,

  ) { }
  GhiChu:any;
  datas: any;
  DropdownLydo: any = [];
  DropdownTrangThai: any = [];
  loading: boolean = false;
  columns: any;
  dataFetch: any = { data: { dataCount: 0 } };
  maxPage: number;
  pages = [];
  nullForm = {
    "UserCode": null,
    "Phone": null,
    "Email": null,
    "UserName": null,
    "Address": null,
    "Status": null
  };
  checkedAll: boolean = false;
  RowCheckedbox: string[] = [];
  header_mock = [
    { header: "Mã", field: "userCode", width: "6%", type: "text" },
    { header: "Tên tài khoản", field: "username", width: "14%", type: "text" },
    { header: "Họ Tên", field: "fullName", width: "15%", type: "text" },
    { header: "Địa chỉ", field: "address", width: "25%", type: "text" },
    { header: "Điện thoại", field: "phone", width: "13%", type: "text" },
    { header: "Email", field: "email", width: "15%", type: "text" },
    { header: "Level", field: "userLevel", width: "5%", type: "text" },
    { header: "Trạng thái", field: "statusDisplay", width: "11%", type: "text" },
  ]
  vn: any; // Đổi tên lịch sang tiếng việt
  ngOnInit() {
    this.loading = true;
    this.columns = this.header_mock;
    this.userService.SearchUserCustomer(1, 10, this.nullForm).toPromise().then(data => {
      if (data.result.success == true) {
        this.dataFetch = data.result;
        this.datas = this.dataFetch.data.lsData;
        this.maxPage = data.result.data.pageCount;
        if (this.maxPage > 5) { this.pages = [1, 2, 3, 4, 5]; } else {
          for (let i = 1; i <= this.maxPage; i++) {
            this.pages.push(i);
          }
        }
        this.messageService.add({ key: 'dstaikhoan', severity: 'success', summary: 'Thông báo', detail: 'Tải dữ liệu thành công!' });
        this.loading = false;
      } else {
        this.messageService.add({ key: 'dstaikhoan', severity: 'error', summary: 'Thông báo', detail: data.message });
        this.loading = false;
      }
    });
    this.systemService.GetUserStatus().toPromise().then(data => {
      if (data.result.success == true) {
        let array: any[] = data.result.data;
        array.forEach(e => {
          this.DropdownTrangThai.push({ label: e.displayValue, value: e.value })
        })
        this.DropdownTrangThai.push({ label: "Tất cả trạng thái", value: null })
      } else {
        this.messageService.add({ key: 'dstaikhoan', severity: 'error', summary: 'Thông báo', detail: data.message });
      }
    })

    this.vn = {
      firstDayOfWeek: 0,
      dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
      dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
      monthNamesShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
      today: 'Hôm nay',
      clear: 'Xóa',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'tuần'
    };
  }

  // ChonTatCa(datas) {
  //   if (this.checkedAll == true) {
  //     this.RowCheckedbox = [];
  //     for (let i = 0; i < this.datas.length; i++) {
  //       this.RowCheckedbox.push(this.datas[i].deliveryRequestId.toString())
  //     }
  //     console.log(this.RowCheckedbox)
  //   } else {
  //     this.RowCheckedbox = []
  //   }
  // }

  ChonTatCa() {
    if (this.checkedAll == true) {
        this.RowCheckedbox = [];
        for (let i = 0; i < this.datas.length; i++) {
            this.RowCheckedbox.push(this.datas[i].userId)
        }
        console.log(this.RowCheckedbox)
    } else {
        this.RowCheckedbox = []
    }
}

  FuncThem() {
    this.confirmationService.confirm({
      key: "dsbienlai",
      header: "Xác nhận",
      message: 'Thêm kiện hàng mới?',
      acceptLabel: "Có",
      rejectLabel: "Không",
      accept: () => {
        alert("Chưa có api thêm")
      }
    });

  }
  FuncSua() { 
    if (this.RowCheckedbox.length == 0){ 
      this.messageService.add({ key: 'dstaikhoan', severity: 'error', summary: 'Thông báo', detail: "Cần chọn dữ liệu trước khi thao tác này!" });
      return;
    }
    const lastId = this.RowCheckedbox.pop();
    this.router.navigateByUrl(`user/edit-user/${lastId}`);
  }
  FuncXoa() { alert("Chưa có api xóa") }

  FuncLoc(formLoc) {
    this.loading = true;
    let form = formLoc.value;
    this.nullForm = form;
    this.selectPage(1)
  }
  ResetForm(formLoc) {
    formLoc.onReset();
  }

  buttonStatus(status) { //function trả lại kiểu class cho loại trạng thái 
    switch (status) {
      case "1": return "btnTaoMoi"; break;
      case "2": return "btnDangthuchien"; break;
      case "3": return "btnHoanthanh"; break;
      case "4": return "btnHuy"; break;
    }
  }

  async loadDataFromServerPerPage(numb) {
    await this.userService.SearchUserCustomer(numb, 10, this.nullForm).toPromise().then(async data => {
      if (data.result.success == true) {
        this.dataFetch = data.result;
        this.datas = this.dataFetch.data.lsData;
        this.maxPage = await data.result.data.pageCount
        this.messageService.add({ key: 'dstaikhoan', severity: 'success', summary: 'Thông báo', detail: 'Tải dữ liệu thành công!' });
        this.loading = false;
      } else {
        this.messageService.add({ key: 'dstaikhoan', severity: 'error', summary: 'Thông báo', detail: data.message });
        this.loading = false;
      }
    })
  }

  // Chuyển đổi dạng input giữa text và date
  StartDate: any = '';
  EndDate: any = '';
  numbPage: number = 1;
  async selectPage(value) {
    this.loading = true;
    let maxPage = this.maxPage

    if (value > 0) {
      await this.loadDataFromServerPerPage(value)
      this.numbPage = value;
    }
    if (value == 'n') {
      if (maxPage == this.numbPage) { this.loading = false; return }
      else {
        this.numbPage++
        await this.loadDataFromServerPerPage(this.numbPage)
      }
    }
    if (value == 'p') {
      if (this.numbPage == 1) { this.loading = false; return }
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
    await 1;
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

  goToTaskDetail(taskId) {
    this.router.navigate(['ship-manager/task-detail'], { queryParams: { id: taskId } })
  }

  goToOrder(refId, refType) {
    switch (refType) {
      case "1":
        this.router.navigate([`/ship-manager/detail-orders?orderId=${refId}`]);
        break;
      case "2":
        alert("Chưa làm chi tiết kiện hàng")
        break;
    }
  }
}