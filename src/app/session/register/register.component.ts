import { CollaborationServices } from "./../../services/collaboration.services";
import { UserService } from "app/services/user.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Validators, FormControl } from "@angular/forms";
import { Warehouse } from "app/model/warehouse.model";
import { User } from "app/model/user.model";
import { SelectItemGroup, SelectItem } from "primeng/api"; // truong import
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/filter";

export interface ReferralInfo {
  referralCode: null;
  expiration: null;
}
@Component({
  selector: "ms-register-session",
  templateUrl: "./register-component.html",
  styleUrls: ["./register-component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [CollaborationServices],
})
export class RegisterComponent {
  lstWarehouse: Warehouse[];
  email = new FormControl("", [Validators.required, Validators.email]);
  hidepass = true;
  hidepassreturn = true;
  selectedWarehouse: any;
  emailValue: string;
  phoneValue: string;
  passwordValue: string;
  messages: any[];

  captchaImg: any;

  registerData: any = {};
  captchaCode: string = "";

  /**
   * 1 min = 60s = 60 * 1000
   * 30 days = 30 * 24 * 60 * 60 * 1000 = 2592000000
   */
  expiryTime = 2592000000; // 2592000000;
  referralCode = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private collaborationServices: CollaborationServices
  ) {}

  ngOnInit() {
    /**
     * set referralCode
     */
    this.route.queryParams.subscribe((params) => {
      try {
        let referralCodeString = localStorage.getItem("referralCode");
        let referralOldInfo: ReferralInfo = null;
        if (referralCodeString) {
          referralOldInfo = JSON.parse(referralCodeString );
        }
        let currentTime = new Date().getTime();
        if (params && params.referralCode != null) {
          if (referralOldInfo && referralOldInfo.referralCode) {
            if (currentTime > Number(referralOldInfo.expiration)) {
              console.log(
                "referralCode qua han.Lay code moi" + params.referralCode, 
                referralOldInfo,
              );
              // set new referralCode
              localStorage.setItem(
                "referralCode",
                JSON.stringify({
                  referralCode: params.referralCode,
                  expiration: currentTime + this.expiryTime,
                })
              );
              this.referralCode = params.referralCode;
            } else {
              console.log(
                "referralCode con han.Lay code cu" + referralOldInfo.referralCode , 
                referralOldInfo
              );
              this.referralCode = referralOldInfo.referralCode;
            }
          } else {
            console.log("chưa có referralCode", params.referralCode);
            // set new referralCode
            localStorage.setItem(
              "referralCode",
              JSON.stringify({
                referralCode: params.referralCode,
                expiration: currentTime + this.expiryTime,
              })
            );
            this.referralCode = params.referralCode;
          }
        }

        if (this.referralCode) {
          this.collaborationServices
            .updateClickReferralLink(this.referralCode)
            .subscribe((res) => {
              console.log(res)
            });
        }
      } catch (error) {
        console.error(error);
      }
    });

    // get register infor
    this.getCaptcha();

    this.userService
      .GetListWarehouseVN()
      .toPromise()
      .then((res) => {
        if (res.result.success) {
          this.lstWarehouse = res.result.data;
          this.lstWarehouse.forEach((warehouse) => {
            this.optionWarehouse.push({
              label: warehouse.name,
              value: warehouse.warehouseId,
            });
          });
        } else {
          this.showMessage("alert-danger", res.result.message);
        }
      });
  }

  getCaptcha() {
    this.captchaImg = null;
    this.captchaCode = null;
    this.userService.getCaptcha().subscribe(
      (res) => {
        if (res && res.result.success) {
          this.captchaImg = res.result.data;
        }
      },
      (error) => {
        this.showMessage(
          "alert-danger",
          "Không lấy được captcha! Hãy thử lại!"
        );
      }
    );
  }
  getErrorMessageEmail() {
    return this.email.hasError("required")
      ? "Email không được trống"
      : this.email.hasError("email")
      ? "Sai định dạng Email"
      : "";
  }
  addNewCustommer() {
    let userData = new User();
    userData.username = this.emailValue;
    userData.password = this.passwordValue;
    userData.phone = this.phoneValue;
    userData.email = this.emailValue;
    userData.captchaImageLink = this.captchaImg.imageLink;
    userData.captchaCode = this.captchaCode;
    userData.referralCode = this.referralCode;
    userData.WarehouseReceive = this.selectedWarehouse.warehouseId;
    this.userService
      .AddNewCustommer(userData)
      .toPromise()
      .then((res) => {
        if (res.result.success) {
        } else {
          this.showMessage("alert-danger", res.result.message);
        }
      })
      .catch(() => {
        this.getCaptcha();
        this.showMessage("alert-danger", "Đăng ký thất bại");
      });
  }
  onClickSave() {
    this.addNewCustommer();
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

  // Code của trường
  readed: boolean = false;
  selectWarehouse: string;
  optionWarehouse: SelectItem[] = [];
  signUpSuccess: boolean = false;
  thongbao: string;
  thongbaoloi: boolean = false;
  countSubmit: number = 0;
  /*
    - signup() sẽ kiểm tra các giá trị đăng kí tài khoản trước khi gửi lên server
    - biến countSubmit =0 là trước khi nhấn đăng kí thì sẽ không hiện thông báo lỗi, 
    sau khi nhấn đăng kí sẽ validate form mỗi lần nhấn phím */
  signup(formSignUp) {
    let form = formSignUp.value;
    let userData = new User();
    userData.username = form.acount;
    userData.phone = form.phone;
    userData.password = form.password;
    userData.email = form.email;
    userData.WarehouseReceive = form.WarehouseReceive;
    userData.captchaImageLink = this.captchaImg.imageLink;
    userData.captchaCode = this.captchaCode;
    userData.referralCode = this.referralCode;
    this.countSubmit++;
    for (let key in form) {
      if (form[key] == "" || form[key] == undefined) {
        let status = "";
        switch (key) {
          case "acount":
            status = "Tên đăng nhập không được để trống!";
            break;
          case "email":
            status = "Email không được để trống!";
            break;
          case "password":
            status = "Mật khẩu không được để trống!";
            break;
          case "WarehouseReceive":
            status = "Vui lòng chọn kho nhận hàng!";
            break;
          case "read":
            status =
              "Vui lòng đọc và đồng ý với các Quy định và Chính sách của Babuvi!";
            break;
          default:
            status = "Vui lòng điền đầy đủ thông tin!";
            break;
        }
        this.notice(status);
        return;
      }
    }
    if (formSignUp.controls.acount.status != "VALID") {
      this.notice("Tài khoản chỉ bao gồm chữ hoa, chữ thường và số!");
      return;
    }
    if (formSignUp.controls.email.status != "VALID") {
      this.notice("Email không đúng định dạng!");
      return;
    }
    if (formSignUp.controls.password.status != "VALID") {
      this.notice("Mật khẩu dài ít nhất 6 kí tự, bao gồm chữ và số!");
      return;
    }
    if (form.password != form.repassword) {
      this.notice("Mật khẩu nhập lại không khớp!");
      return;
    }
    if (!this.captchaImg || !this.captchaCode) {
      this.notice("Vui lòng gõ mã captcha!");
      return;
    }

    this.userService
      .AddNewCustommer(userData)
      .toPromise()
      .then((res) => {
        if (res.result.success) {
          this.signUpSuccess = true;
          setTimeout(() => {
            this.router.navigate(["/authentication/login"]);
          }, 5000);
          formSignUp.onReset();
        } else {
          this.getCaptcha();
          this.notice(res.result.message);
        }
      })
      .catch(() => {
        this.getCaptcha();
        this.notice("Đăng ký thất bại");
      });
  }

  notice(notice) {
    this.thongbao = notice;
    this.thongbaoloi = true;
  }

  //handle Key sau lần chọn đanwg kí đầu tiên, mỗi lần keyup sẽ bắt xem còn nội dung nào phải sửa
  handleKeyUp(e, formSignUp) {
    if (formSignUp.valid) {
      this.thongbaoloi = false;
    }
    if (this.countSubmit > 0) {
      let form = formSignUp.value;
      for (let key in form) {
        if (form[key] == "" || form[key] == undefined || form[key] == false) {
          let status = "";
          switch (key) {
            case "acount":
              status = "Tên đăng nhập không được để trống!";
              break;
            case "email":
              status = "Email không được để trống!";
              break;
            case "password":
              status = "Mật khẩu không được để trống!";
              break;
            case "WarehouseReceive":
              status = "Vui lòng chọn kho nhận hàng!";
              break;
            case "read":
              status =
                "Vui lòng đọc và đồng ý với các Quy định và Chính sách của Babuvi!";
              break;
            default:
              status = "Vui lòng điền đầy đủ thông tin!";
              break;
          }
          this.notice(status);
          return;
        }
      }
      if (formSignUp.controls.email.status != "VALID") {
        this.notice("Email không đúng định dạng!");
        return;
      }
      if (formSignUp.controls.password.status != "VALID") {
        this.notice("Mật khẩu dài ít nhất 6 kí tự, bao gồm chữ và số!");
        return;
      }
      if (form.password != form.repassword) {
        this.notice("Mật khẩu nhập lại không khớp!");
        return;
      }
      if (!this.captchaCode || !this.captchaImg) {
        this.notice("Vui lòng gõ mã captcha!");
        return;
      }
    }
  }

  /*
    For GG captcha
    showResponse(e){
        if(this.thongbao == "Vui lòng gõ mã captcha!"){
            this.thongbaoloi = false;
        }
      }

    showExpire(){
        this.notice('Vui lòng gõ mã captcha!');
    }

    */

  newpw: string = "password";
  renewpw: string = "password";
  changeType(th) {
    switch (th) {
      case 0:
        this.newpw = this.newpw == "text" ? "password" : "text";
        break;
      case 1:
        this.renewpw = this.renewpw == "text" ? "password" : "text";
        break;
    }
  }
  // Hết code của trường
}
