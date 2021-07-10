import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from './common/http.service';
import {ApiApplication} from 'app/config/app.config';
import {ApiService} from './common/api.service';
@Injectable()
export class CouponServices extends ApiService {
    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.service.controller, http, _router);
    }


    getMyCoupon(pageIndex, pageSize) {
        return this.get(this.apiBaseController + ApiApplication.service.getMyCoupon + `?page=${pageIndex}&perPage=${pageSize}`);
    }

    getCouponByCode(couponCode) {
        return this.get(this.apiBaseController + ApiApplication.service.getCouponByCode + `?couponCode=${couponCode}`);
    }

}