import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from './common/api.service';
import {HttpService} from './common/http.service';
import {ApiApplication} from '../config/app.config';
import {WarehouseImp} from '../model/warehouse-imp.model';

@Injectable()
export class WarehouseImpService extends ApiService {
    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.warehouse.controller, http, _router);
    }

    saveWarehouseImp(data: WarehouseImp) {
        return this.post(this.apiBaseController + ApiApplication.warehouse.saveWarehouseImp, data);
    }

    completeWarehouseImp(data: WarehouseImp) {
        return this.put(this.apiBaseController + ApiApplication.warehouse.completeWarehouseImp, data);
    }

    getWarehouseExpByCode(expCode) {
        const param = '?expCode=' + expCode;
        return this.get(this.apiBaseController + ApiApplication.warehouse.getWarehouseExpByCode + param);
    }

    getWarehouseImpViewById(warehouseImpId) {
        const param = '?warehouseImpId=' + warehouseImpId;
        return this.get(this.apiBaseController + ApiApplication.warehouse.getWarehouseImpViewById + param);
    }

    deleteLsImpDetail(deleteIds) {
        const body = {
            lsId: deleteIds
        };
        return this.delete(this.apiBaseController + ApiApplication.warehouse.deleteLsImpDetail, body);
    }
}
