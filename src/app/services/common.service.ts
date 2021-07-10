import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './common/http.service';
import { ApiApplication, paging } from 'app/config/app.config';
import { ApiService } from './common/api.service';

@Injectable()
export class CommonService extends ApiService {

    constructor(http: HttpService, _router: Router) { 
        super(ApiApplication.lstUserItem.controller, http, _router);
    }

    getLstUser(page: number) {
        return this.get(ApiApplication.lstUserItem.controller 
            + ApiApplication.lstUserItem.lstUser 
            + "?" + ApiApplication.lstUserItem.perPage + "=" + paging.perPage
            + "&" + ApiApplication.lstUserItem.page + "=" + page);
    }

    getInfoUser(userId: number) { //ClientProfile
        return this.get(ApiApplication.infoUser + userId);
    }

    getWalletByUserId(userId: number) {
        return this.get(ApiApplication.walletByUserId + userId);
    }
    
    getLsWallet() {
        return this.get(ApiApplication.wallet.controller + ApiApplication.wallet.getLsWallet);
    }

    getLstButton(usercode: number, path: string){
        return this.get(ApiApplication.lstUserItem.common 
                        + ApiApplication.lstUserItem.actionAccess
                        + ApiApplication.lstUserItem.actionParam1 + '=' + usercode + '&'
                        + ApiApplication.lstUserItem.actionParam2 + '=' + path);
    }


    getRating() {
        return this.get(ApiApplication.Extension.controller + ApiApplication.Extension.exchangerate);
    }



}
