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
            console.log("ch??a c?? referralCode", params.referralCode);
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
          "Kh??ng l???y ???????c captcha! H??y th??? l???i!"
        );
      }
    );
  }
  getErrorMessageEmail() {
    return this.email.hasError("required")
      ? "Email kh??ng ???????c tr???ng"
      : this.email.hasError("email")
      ? "Sai ?????nh d???ng Email"
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
        this.showMessage("alert-danger", "????ng k?? th???t b???i");
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

  // Code c???a tr?????ng
  readed: boolean = false;
  selectWarehouse: string;
  optionWarehouse: SelectItem[] = [];
  signUpSuccess: boolean = false;
  thongbao: string;
  thongbaoloi: boolean = false;
  countSubmit: number = 0;
  /*
    - signup() s??? ki???m tra c??c gi?? tr??? ????ng k?? t??i kho???n tr?????c khi g???i l??n server
    - bi???n countSubmit =0 l?? tr?????c khi nh???n ????ng k?? th?? s??? kh??ng hi???n th??ng b??o l???i, 
    sau khi nh???n ????ng k?? s??? validate form m???i l???n nh???n ph??m */
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
            status = "T??n ????ng nh???p kh??ng ???????c ????? tr???ng!";
            break;
          case "email":
            status = "Email kh??ng ???????c ????? tr???ng!";
            break;
          case "password":
            status = "M???t kh???u kh??ng ???????c ????? tr???ng!";
            break;
          case "WarehouseReceive":
            status = "Vui l??ng ch???n kho nh???n h??ng!";
            break;
          case "read":
            status =
              "Vui l??ng ?????c v?? ?????ng ?? v???i c??c Quy ?????nh v?? Ch??nh s??ch c???a Babuvi!";
            break;
          default:
            status = "Vui l??ng ??i???n ?????y ????? th??ng tin!";
            break;
        }
        this.notice(status);
        return;
      }
    }
    if (formSignUp.controls.acount.status != "VALID") {
      this.notice("T??i kho???n ch??? bao g???m ch??? hoa, ch??? th?????ng v?? s???!");
      return;
    }
    if (formSignUp.controls.email.status != "VALID") {
      this.notice("Email kh??ng ????ng ?????nh d???ng!");
      return;
    }
    if (formSignUp.controls.password.status != "VALID") {
      this.notice("M???t kh???u d??i ??t nh???t 6 k?? t???, bao g???m ch??? v?? s???!");
      return;
    }
    if (form.password != form.repassword) {
      this.notice("M???t kh???u nh???p l???i kh??ng kh???p!");
      return;
    }
    if (!this.captchaImg || !this.captchaCode) {
      this.notice("Vui l??ng g?? m?? captcha!");
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
        this.notice("????ng k?? th???t b???i");
      });
  }

  notice(notice) {
    this.thongbao = notice;
    this.thongbaoloi = true;
  }

  //handle Key sau l???n ch???n ??anwg k?? ?????u ti??n, m???i l???n keyup s??? b???t xem c??n n???i dung n??o ph???i s???a
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
              status = "T??n ????ng nh???p kh??ng ???????c ????? tr???ng!";
              break;
            case "email":
              status = "Email kh??ng ???????c ????? tr???ng!";
              break;
            case "password":
              status = "M???t kh???u kh??ng ???????c ????? tr???ng!";
              break;
            case "WarehouseReceive":
              status = "Vui l??ng ch???n kho nh???n h??ng!";
              break;
            case "read":
              status =
                "Vui l??ng ?????c v?? ?????ng ?? v???i c??c Quy ?????nh v?? Ch??nh s??ch c???a Babuvi!";
              break;
            default:
              status = "Vui l??ng ??i???n ?????y ????? th??ng tin!";
              break;
          }
          this.notice(status);
          return;
        }
      }
      if (formSignUp.controls.email.status != "VALID") {
        this.notice("Email kh??ng ????ng ?????nh d???ng!");
        return;
      }
      if (formSignUp.controls.password.status != "VALID") {
        this.notice("M???t kh???u d??i ??t nh???t 6 k?? t???, bao g???m ch??? v?? s???!");
        return;
      }
      if (form.password != form.repassword) {
        this.notice("M???t kh???u nh???p l???i kh??ng kh???p!");
        return;
      }
      if (!this.captchaCode || !this.captchaImg) {
        this.notice("Vui l??ng g?? m?? captcha!");
        return;
      }
    }
  }

  /*
    For GG captcha
    showResponse(e){
        if(this.thongbao == "Vui l??ng g?? m?? captcha!"){
            this.thongbaoloi = false;
        }
      }

    showExpire(){
        this.notice('Vui l??ng g?? m?? captcha!');
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
  // H???t code c???a tr?????ng
}
