import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './common/http.service';
import { ApiApplication, paging } from 'app/config/app.config';
import { ApiService } from './common/api.service';

@Injectable()
export class ShipManagerService extends ApiService {
    constructor(http: HttpService, _router: Router ) { 
        super(ApiApplication.shipManager.controller, http, _router);
    }
    
    // getAllOrders(userId: number, page: number) {
    //     return this.get(this.apiBaseController
    //         + ApiApplication.shipManager.allOrder + '?'
    //         + ApiApplication.userId + '= '+userId + '&'
    //         + ApiApplication.perPage +'= ' + 10 + '&'
    //         + ApiApplication.page + '= ' + page);
    // }

    cancelOrder(orderId: number) {
        return this.put(this.apiBaseController + ApiApplication.shipManager.cancelOrder
                + '?orderId='+orderId);
    }

    //API danh sách đơn hàng quản lý
    getListOrdersManager(data, page, perPage) {
        return this.post(this.apiBaseController + ApiApplication.shipManager.searchOrderManager + `?perPage=${perPage}&page=${page}`,data)
    }

    //API danh sách đơn hàng quản lý
    getListOrdersStaff(data, page, perPage) {
        return this.post(this.apiBaseController + ApiApplication.shipManager.searchOrderStaff + `?perPage=${perPage}&page=${page}`,data)
    }


    //API danh sách đơn hàng
    getListOrders(data, page, perPage) {
        return this.post(this.apiBaseController + ApiApplication.shipManager.searchOrder + `?perPage=${perPage}&page=${page}`,data)
    }

    //API danh sách đơn kí gửi
    getConsignmentOrders(data, page, perPage) {
        return this.post(this.apiBaseController + ApiApplication.shipManager.searchOrderConsignment + `?perPage=${perPage}&page=${page}`,data)
    }

}
