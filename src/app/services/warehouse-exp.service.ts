import {ApiApplication} from '../config/app.config';
import {ApiService} from './common/api.service';
import {HttpService} from './common/http.service';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
//Model
import {WarehouseExp} from '../model/warehouse-exp.model';

@Injectable()
export class WarehouseExpService  extends ApiService {
    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.warehouse.controller, http, _router);
    }

    createWarehouseExpByDeliveryRequest(body) {
        return this.post(this.apiBaseController + ApiApplication.warehouse.createWarehouseExpByDeliveryRequest, body);
    }

    cancelWarehouseExp(body) {
        return this.post(this.apiBaseController + ApiApplication.warehouse.cancelWarehouseExp, body);
    }

    saveWarehouseExp(data: WarehouseExp) {
        return this.post(this.apiBaseController + ApiApplication.warehouse.saveWarehouseExp, data);
    }

    getWarehouseExpById(warehouseExpId) {
        const param = '?warehouseExpId=' + warehouseExpId;
        return this.get(this.apiBaseController + ApiApplication.warehouse.getWarehouseExpById + param);
    }

    deleteLsExpDetail(deleteIds) {
        const body = {
            lsId: deleteIds
        };
        return this.delete(this.apiBaseController + ApiApplication.warehouse.deleteLsExpDetail, body);
    }

    completeWarehouseExp(data: WarehouseExp) {
        return this.put(this.apiBaseController + ApiApplication.warehouse.completeWarehouseExp, data);
    }
}
