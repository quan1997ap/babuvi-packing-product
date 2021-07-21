import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from './common/http.service';
import {ApiApplication} from 'app/config/app.config';
import {ApiService} from './common/api.service';
import { Merchandise, MerchandiseAddPrams } from "../model/merchandise.model";
import {DeliveryRequest} from '../model/body/delivery-request.model';

@Injectable()
export class MerchandiseServices extends ApiService {
    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.merchandise.controller, http, _router);
    }

    deleteShipment(shipmentData){
        return this.post(
            this.apiBaseController + ApiApplication.merchandise.deleteShipment,
            shipmentData
          );
    }
    addOrUpdateShipment(shipmentData){
        return this.post(
            this.apiBaseController + ApiApplication.merchandise.addOrUpdateShipment,
            shipmentData
          );
    }

    getMerchandiseViewModel(orderCode: string, perPage, page) {
        const param = '?orderCode=' + orderCode + '&perPage=' + perPage + '&page=' + page;
        return this.get(this.apiBaseController + ApiApplication.merchandise.getMerchandiseViewModel + param);
    }

    getStatus() {
        return this.get(ApiApplication.system.controller + '/' + ApiApplication.system.getOrderStatus);
    }

    saveMerchandise(data: Merchandise) {
        return this.post(this.apiBaseController + ApiApplication.merchandise.addMerchandise, data);
    }

    addMerchandise(data: MerchandiseAddPrams) {
        return this.post(
          this.apiBaseController + ApiApplication.merchandise.addMerchandise,
          data
        );
      }

    deleteMerchandise(merchandiseIds: number[]) {
        const body = {
            lsId: merchandiseIds,
        }
        return this.delete(this.apiBaseController + ApiApplication.merchandise.deleteMerchandise, body);
    }

    getMerchandiseHistory(merchandiseId: number, perPage, page) {
        const param = '?merchandiseId=' + merchandiseId + '&perPage=' + perPage + '&page=' + page;
        return this.get(this.apiBaseController + ApiApplication.merchandise.getMerchandiseHistory +  param);
    }

    completeMerchandise(orderCode) {
        return this.put(ApiApplication.order.controller + '/' + ApiApplication.order.completeAddMerchandise + orderCode);
    }

    countSumMerchandiseInWarehouse(userId: number) {
        return this.get(this.apiBaseController + ApiApplication.merchandise.countSumMerchandiseInWarehouse + '?userId=' + userId);
    }

    getMerchandiseInWarehouseManager(userCode, page, perPage) {
        const param = '?userCode=' + userCode + '&perPage=' + perPage + '&page=' + page;
        return this.get(this.apiBaseController + ApiApplication.merchandise.getMerchandiseInWarehouseManager + param);
    }

    getMerchandiseInWarehouse(page, perPage) {
        const param = '?perPage=' + perPage + '&page=' + page;
        return this.get(this.apiBaseController + ApiApplication.merchandise.getMerchandiseInWarehouse + param);
    }

    getLsMerchandiseByMWId(mwIds) {
        const body = {
            lsId : mwIds,
        };
        return this.post(this.apiBaseController + ApiApplication.merchandise.getLsMerchandiseByMWId, body);
    }

    addDeliveryRequest(body: DeliveryRequest) {
        return this.post(this.apiBaseController + ApiApplication.merchandise.addDeliveryRequest, body);
    }

    getDeliveryRequestByCode(code) {
        const param = '?deliveryRequestCode=' + code;
        return this.get(this.apiBaseController + ApiApplication.merchandise.getDeliveryRequestByCode + param);
    }

    refreshImageDeliveryRequest(body: any) {
        return this.post(this.apiBaseController + ApiApplication.merchandise.refreshImageDeliveryRequest, body);
    }


    createPackage(body) {
        return this.post(this.apiBaseController + ApiApplication.merchandise.createPackage, body);
    }

    deletePackage(body){
        return this.put(this.apiBaseController + ApiApplication.merchandise.deletePackage, body);
    }

    sendDelivery(body) {
        return this.post(this.apiBaseController + ApiApplication.merchandise.sendDelivery, body);
    }

    finishShipment(body){
        return this.post(this.apiBaseController + ApiApplication.merchandise.finishShipment, body);
    }

    cancelDelivery(body) {
        return this.post(this.apiBaseController + ApiApplication.merchandise.cancelDelivery, body);
    }

    getDeliveryAddressDefault() {
        return this.get(this.apiBaseController + ApiApplication.merchandise.getDeliveryAddressDefault);
    }

    getMerchandiseByCode(merchandiseCode) {
        const param = '?merchandiseCode=' + merchandiseCode;
        return this.get(this.apiBaseController + ApiApplication.merchandise.getMerchandiseByCode + param);
    }


    getLsMerchandiseInWhByOrderId(orderId) {
        const param = '?orderId=' + orderId;
        return this.get(this.apiBaseController + ApiApplication.merchandise.getLsMerchandiseInWhByOrderId + param);
    }

    getDeliveryRequestType(){
        return this.get(ApiApplication.system.controller + '/' + ApiApplication.system.getDeliveryRequestType);
    }
    getDeliveryRequestStatus(){
        return this.get(ApiApplication.system.controller + '/getDeliveryRequestStatus');
    }
    searchListDeliveryRequest(page:any,perPage:any,datasearch:any){
        return this.post(this.apiBaseController + `searchListDeliveryRequest/?page=${page}&perPage=${perPage}`,datasearch)
    }
    searchListDeliveryRequestManager(page:any,perPage:any,datasearch:any){
        return this.post(this.apiBaseController + `searchListDeliveryRequestManager/?page=${page}&perPage=${perPage}`,datasearch)
    }
    deleteLsDeliveryRequest(deleteIds:any){
        return this.put(this.apiBaseController + "cancelLsDeliveryRequest/", deleteIds);
    }

    searchMerchandise(page:number,perPage:number,data){
        return this.post(this.apiBaseController + `searchMerchandise?perPage=${perPage}&page=${page}`,data)
    }

    searchMerchandiseManager(page:number,perPage:number,data){
        return this.post(this.apiBaseController + `searchMerchandiseManager?perPage=${perPage}&page=${page}`,data)
    }

    changeStatusDeliveryRequestDetail(requestId) {
        return this.post(
          ApiApplication.merchandise.controller +
            `/changeStatusDeliveryRequestDetail?deliveryRequestDetailId=${requestId}`
        );
    }

    startHandleDeliveryRequest(lsId) {
        return this.post(
          ApiApplication.merchandise.controller +
            ApiApplication.merchandise.startHandleDeliveryRequest,
          { lsId: lsId }
        );
    }

    finishHandleDeliveryRequest(lsId) {
        return this.post(
          ApiApplication.merchandise.controller +
            ApiApplication.merchandise.finishHandleDeliveryRequest,
          { lsId: lsId }
        );
    }
    
    cancelHandleDeliveryRequest(lsId) {
        return this.post(
          ApiApplication.merchandise.controller +
            ApiApplication.merchandise.cancelHandleDeliveryRequest,
          { lsId: lsId }
        );
    }

    getLsTransporter(){
        return this.get(ApiApplication.merchandise.controller + ApiApplication.merchandise.getLsTransporter);
    }

    updateShipment(body) {
        return this.post(this.apiBaseController + ApiApplication.merchandise.updateShipment, body);
    }
}
