import { PaymentRequestSearchModel } from "./../model/payment-request.model";
import { ApiBaseUrl } from "./../config/app.config";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "./common/http.service";
import { ApiApplication, paging } from "app/config/app.config";
import { ApiService } from "./common/api.service";

@Injectable()
export class ServicePackService extends ApiService {
  constructor(http: HttpService, _router: Router) {
    super(ApiApplication.shipManager.controller, http, _router);
  }

  getLsServicePackByUser(pageIndex, pageSize) {
    return this.get(
      ApiApplication.service.controller +
        ApiApplication.service.getLsServicePackByUser +
        `?page=${pageIndex}&perPage=${pageSize}`
    );
  }
  paymentServicePack(servicePackId) {
    return this.post(
      ApiApplication.service.controller +
        ApiApplication.service.paymentServicePack +
        `?servicePackId=${servicePackId}`
    );
  }
}
