import { Component, OnInit ,ViewEncapsulation, AfterViewInit } from '@angular/core';
import {Router} from "@angular/router";
import { RsLogin } from 'app/model/body/rs-login.model';
import { ApiApplication } from 'app/config/app.config';
import { InfoRating } from 'app/model/info-rating.model';
import { PassDataService } from 'app/services/pass-data.services';
import {MessageService} from 'primeng/components/common/api';
import {Message} from 'primeng/api';
//service
import { CommonService } from 'app/services/common.service';
import { LoginService } from 'app/services/login.service';
import { SystemService } from 'app/services/system.services';

@Component({
   selector: 'ms-login-session',
   templateUrl:'./login-component.html',
   styleUrls: ['./login-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements AfterViewInit {
	
  username: string;
  password: string;
  loading: boolean = false;
  infoRating: InfoRating;
  msgs: Message[] = [];

  constructor(
    private messageService: MessageService,
    private _passData: PassDataService,
    private _commonServices: CommonService,
    private systemService: SystemService,
    private router: Router,
    private _login: LoginService,
  ) { }

  ngAfterViewInit () {
  }

  login() {
    var _self = this;
    _self.loading = true;
    const account: RsLogin = {
      username: _self.username,
      password: _self.password,
      clientAppCode: ApiApplication.clientAppCode
    }
    _self._login.getLogin(account).subscribe( res => {
      if(res.result.success) {
        localStorage.setItem('lMenu', JSON.stringify(res.result.data.lsMenu));
        localStorage.setItem('token', JSON.stringify(res.result.data.token));
        localStorage.setItem('userData', JSON.stringify(res.result.data.userData));
        localStorage.setItem('customerData', JSON.stringify(res.result.data.userData));
        localStorage.setItem('lUserSettings', JSON.stringify(res.result.data.lsUserSetting));
        localStorage.setItem('userLevel', JSON.stringify(res.result.data.userLevel));
        _self.getInfoRating(res.result.data.userData.userId);
        _self.router.navigate(['/collaboration/collaboration-statistics']);
      } else {
        _self.msgs = [];
        _self.msgs.push({severity:'error', summary: res.result.message, detail:''});
        setTimeout(function() {
          _self.clear();
        }, 10000);
      }
      _self.loading = false;
    }, error => {
      _self.msgs = [];
      _self.msgs.push({severity:'error', summary: 'Đăng nhập thất bại', detail:''});
      setTimeout(function() {
        _self.clear();
      }, 10000);
      _self.loading = false;
    })
  }

  clear() {
    this.msgs = [];
  }

  getInfoRating(UserId: number) {
    this.systemService.getInfoRating(UserId).subscribe(res => {
      if(res.result.success) {
        this.infoRating = res.result.data;
        localStorage.setItem('ratingInfo', JSON.stringify(res.result.data));
      } else {
        console.log("can't get InfoRating")
      }
    }, err => {
      
    })
  }
  
	loginKey(data: any) {
    //console.log(data);
  }
}



