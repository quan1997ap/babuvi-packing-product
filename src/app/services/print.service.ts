import {Injectable} from "@angular/core";
import {ApiService} from "./common/api.service";
import {HttpService} from "./common/http.service";
import {Router} from "@angular/router";
import {ApiApplication} from "../config/app.config";

@Injectable()
export class PrintService extends ApiService{
    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.print.controller, http, _router);
    }

    printShipmentById(shipmentId){
        return this.get(this.apiBaseController + ApiApplication.print.printShipmentById + '?shipmentId=' + shipmentId);

    }
    printWarehouseExp(expCode) {
        const param = '?expCode=' + expCode
        return this.get(this.apiBaseController + ApiApplication.print.printWarehouseExp + '/' + param);
    }

    printShipByDeliveryRequest(deliveryRequestId) {
        const param = '?deliveryRequestId=' + deliveryRequestId
        return this.get(this.apiBaseController + ApiApplication.print.printShipByDeliveryRequest + '/' + param);
    }

    printDeliveryRequest(deliveryCode) {
        const param = '?deliveryCode=' + deliveryCode
        return this.get(this.apiBaseController + ApiApplication.print.printDeliveryRequest + '/' + param);
    }
}