import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [UserService]
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private UserService: UserService,
  ) { }
  display = true;
  ngOnInit() {
  }

  thongbao: string = "";
  thongbaoloi: boolean = false;
  changeSuccess: boolean = false;
  loading: boolean = false;
  changePass(form) {
    console.log(form)
    if (form.controls.newPassword.invalid) {
      this.thongbao = "Mật khẩu mới dài ít nhất 6 kí tự!";
      this.thongbaoloi = true;
      return;
    }
    // if(form.value.newPassword == form.value.oldPassword){
    //   this.thongbao ="Mật khẩu cũ và mật khẩu mới trùng nhau!";
    //   this.thongbaoloi = true;
    //   return;
    // }
    if (form.invalid) {
      this.thongbao = "Vui lòng điền đầy đủ thông tin!";
      this.thongbaoloi = true;
      return;
    }
    if (form.value.newPassword != form.value.reNewPassword) {
      this.thongbao = "Mật khẩu nhập lại không trùng khớp!";
      this.thongbaoloi = true;
      return;
    }
    this.confirmationService.confirm({
      key: "changepass",
      message: 'Chắc chắn đổi mật khẩu?',
      acceptLabel: "Có",
      rejectLabel: "Không",
      accept: () => {
        this.loading = true;
        console.log(form.value);
        this.UserService.changePass({ oldpass: form.value.oldPassword, newpass: form.value.newPassword })
          .toPromise().then(data => {
            if (data.result.success == true) {
              this.loading = false;
              this.changeSuccess = true;
              setTimeout(() => {
                this.changeSuccess = false;
                form.onReset();
              }, 3500);
            }
            else {
              this.thongbao = data.result.message;
              this.thongbaoloi = true;
              this.loading = false;
              console.log(data)
            }
          })
        this.thongbaoloi = false;
      },
      reject: () => {
        this.thongbaoloi = false;
        this.loading = false;
      }
    });

  }

  return() {
    this.router.navigate(["/user"])
  }
}
