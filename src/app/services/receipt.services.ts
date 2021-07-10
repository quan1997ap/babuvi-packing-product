import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './common/http.service';
import { ApiApplication, paging } from 'app/config/app.config';
import { ApiService } from './common/api.service';

@Injectable()
export class ReceiptService extends ApiService {
    constructor(http: HttpService, _router: Router ) {
        super(ApiApplication.receipt.controller, http, _router);
    }

    addReceipt(data:any){
        return this.post(this.apiBaseController + `addReceipt`,data)
    }

    searchReceipt(page:number, perPage:number,data:any){
        return this.post(this.apiBaseController + `searchReceipt/?page=${page}&perPage=${perPage}`,data)
    }

}