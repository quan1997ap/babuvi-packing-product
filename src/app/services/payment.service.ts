import { PaymentRequestModel, PaymentRequestSearchModel } from "./../model/payment-request.model";
import { ApiBaseUrl } from "./../config/app.config";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "./common/http.service";
import { ApiApplication, paging } from "app/config/app.config";
import { ApiService } from "./common/api.service";

@Injectable()
export class PaymentService extends ApiService {
  constructor(http: HttpService, _router: Router) {
    super(ApiApplication.shipManager.controller, http, _router);
  }

  getPaymentRequestById(requestId){
    return this.get(
      ApiApplication.paymentRequest.controller +
        ApiApplication.paymentRequest.getPaymentRequestById +
        `?paymentRequestId=${requestId}`
    );
  }
  searchPaymentRequest(pageIndex, pageSize, params: PaymentRequestSearchModel) {
    // /Merchandise/searchPaymentRequest?page=1&perPage=1
    return this.post(
      ApiApplication.paymentRequest.controller +
        ApiApplication.paymentRequest.searchPaymentRequest +
        `?page=${pageIndex}&perPage=${pageSize}`,
      params
    );
  }

  getPaymentRequestType() {
    return this.get(
      ApiApplication.system.controller +
        ApiApplication.system.getPaymentRequestType
    );
  }

  getLsServiceGroupPaymentRequest(){
    return this.get(
      ApiApplication.service.controller +
        ApiApplication.service.getLsServiceGroupPaymentRequest
    );
  }

  getPaymentRequestStatus() {
    return this.get(
      ApiApplication.system.controller +
        ApiApplication.system.getPaymentRequestStatus
    );
  }

  // add
  addPaymentRequest(paymentRequest) {
    return this.post(
      ApiBaseUrl + `paymentRequest/addPaymentRequest`,
      paymentRequest
    );
  }

  paymentRequestFee() {
    return this.post();
  }

  deletePaymentRequest(paymentRequestId) {
    return this.put(
      ApiBaseUrl +
        `paymentRequest/deletePaymentRequest?paymentRequestId=${paymentRequestId}`
    );
  }

  calPaymentRequest(params: PaymentRequestModel){
    return this.post(ApiApplication.paymentRequest.controller + ApiApplication.paymentRequest.calPaymentRequest, params );
  }

  addCouponPaymentRequest(params){
    /*
     * params = {
        “Coupon”: “COUPON01”,
        “lsPaymentRequest”: []
      }
     */
    return this.post(ApiApplication.paymentRequest.controller + ApiApplication.paymentRequest.addCouponPaymentRequest, params );
  }
}
