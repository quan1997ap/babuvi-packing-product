import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './common/api.service';
import { HttpService } from './common/http.service';
import { ApiApplication } from 'app/config/app.config';
import {OrderBuy} from '../model/body/order-buy.model';
import {RequestModel} from '../model/request.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class OrderService extends ApiService {
    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.order.controller, http, _router);
    }

    getOrderViewModelById(id: number) {
        const param = '?orderId=' + id;
        return this.get(this.apiBaseController + ApiApplication.order.getOrderViewModelById + param);
    }

    getOrderDetailById(orderId) {
        return this.get(this.apiBaseController + 'getOrderDetailViewModel?orderid=' + orderId).pipe(map((res: any) => {
            if (res.message === 'successful') {
                // success -->
                return res.result.data;
            } else {
                return throwError('cant get');
            }
        }), catchError(error => {
            return throwError(error);
        }));
    }

    payListOrder(data: RequestModel) {
        return this.put(this.apiBaseController + ApiApplication.order.payListOrder, data);
    }

    getOrderBuy(orderId: number) {
        return this.get(this.apiBaseController + ApiApplication.order.getOrderBuy + orderId);
    }

    addNewOrderService(ServiceId: number, OrderId: number) {
        return this.post(this.apiBaseController +  ApiApplication.order.addNewOrderService + '?'
                        + 'ServiceId' + '=' + ServiceId + '&'
                        + 'OrderId' + '=' + OrderId);
    }

    delOrderService(serviceOrderId: number) {
        return this.post(this.apiBaseController +  ApiApplication.order.deleteOrderService + '?'
                        + 'serviceOrderId' + '=' + serviceOrderId);
    }

    saveOrderAfterBuy(orderBuy: OrderBuy) {
        return this.put(this.apiBaseController + ApiApplication.order.saveOrderAfterBuy, orderBuy);
    }

    completedBuyOrder(orderBuy: OrderBuy) {
        return this.put(this.apiBaseController + ApiApplication.order.completedBuyOrder, orderBuy);
    }

    editOrderAfterCompleted(orderBuy: OrderBuy) {
         return this.put(this.apiBaseController + ApiApplication.order.editOrderAfterCompleted, orderBuy);
    }

    orderBuyRework(orderBuy: OrderBuy) {
        return this.put(this.apiBaseController + ApiApplication.order.orderBuyRework, orderBuy);
    }

    orderFinish(orderBuy: OrderBuy) {
        return this.put(this.apiBaseController + ApiApplication.order.orderFinish, orderBuy);
   }

    startBuy(orderId: number) {
        const param = '?orderId=' + orderId;
        return this.put(this.apiBaseController + ApiApplication.order.startBuy + param);
    }

    getLsOrderPay(orderIds: number[]) {
        const body = {
            lsId: orderIds
        };
        return this.post(this.apiBaseController + ApiApplication.order.getLsOrderPay, body);
    }

    getDeliveryRequestType() {
        return this.get(ApiApplication.system.controller + '/' + ApiApplication.system.getDeliveryRequestType);
    }

    sumMissingAmount(ids: number[]) {
        const body = {
            lsId: ids
        };
        return this.post(this.apiBaseController + ApiApplication.order.sumMissingAmount, body);
    }

    getAllArea() {
        return this.get(ApiApplication.system.controller + '/' + ApiApplication.system.getAllArea);
    }

    getCountry() {
        return this.get(ApiApplication.system.controller + '/' + ApiApplication.system.GetCountry);
    }

    getAreaByParent(id) {
        return this.get(ApiApplication.system.controller + '/' + ApiApplication.system.getAreaByParent + '/' + id);
    }

    staffCancelOrder(orderId: number) {
        const param = '?orderId=' + orderId;
        return this.put(this.apiBaseController + ApiApplication.order.staffCancelOrder + param);
    }
    cancelOrderAfterBuy(orderId: number) {
        const param = '?orderId=' + orderId;
        return this.put(this.apiBaseController + ApiApplication.order.cancelOrderAfterBuy + param);
    }
}
