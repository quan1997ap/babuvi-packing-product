import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './common/http.service';
import { ApiApplication, paging } from 'app/config/app.config';
import { ApiService } from './common/api.service';

@Injectable()
export class lsReceiptTopupService extends ApiService {
    constructor(http: HttpService, _router: Router ) { 
        super(ApiApplication.receiptTopup.controller, http, _router);
    }

    getReceiptTopup(perPage: number, page: number) {
        return this.get(ApiApplication.receiptTopup.controller+"?"+ApiApplication.receiptTopup.perPage+"="+perPage+"&"+ApiApplication.receiptTopup.page+"="+page);
    }

    destroyReceiptTopup(receiptId: number) {
        return this.put(ApiApplication.receiptTopup.destroy, undefined, [receiptId]);
    }
    
}
