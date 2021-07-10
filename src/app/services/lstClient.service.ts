import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './common/http.service';
import { ApiApplication, paging } from 'app/config/app.config';
import { ApiService } from './common/api.service';

@Injectable()
export class LstClientService extends ApiService {
    constructor(http: HttpService, _router: Router ) { 
        super(ApiApplication.lstUserItem.controller, http, _router);
    }

    getLstUser(page: number) {
        return this.get(ApiApplication.lstUserItem.controller 
            + ApiApplication.lstUserItem.lstUser 
            + "?" + ApiApplication.lstUserItem.perPage + "=" + paging.perPage
            + "&" + ApiApplication.lstUserItem.page + "=" + page);
    }
    tes() {
        return this.get(ApiApplication.user.controller + ApiApplication.user.refreshToken);
    }
    
}
