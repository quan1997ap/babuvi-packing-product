import { ApDomainType } from "app/config/app.config";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "./common/http.service";
import { ApiApplication, paging } from "app/config/app.config";
import { ApiService } from "./common/api.service";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class SystemService extends ApiService {
  constructor(http: HttpService, _router: Router) {
    super(ApiApplication.system.controller, http, _router);
  }

  getAllWarehouse() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getAllWarehouse
    );
  }

  getWarehouseImpStatus() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getWarehouseImpStatus
    );
  }

  getWarehouseExpStatus() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getWarehouseExpStatus
    );
  }

  getInfoRating(userId: number) {
    return this.get(
      this.apiBaseController +
        ApiApplication.system.getVerticalMenu +
        "?userId=" +
        userId
    );
  }

  GetPaymentStatus() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getPaymentStatus
    );
  }

  getType() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getWalletTransactionsType
    );
  }

  getTypeCustomer() {
    return this.get(
      this.apiBaseController +
        ApiApplication.system.getWalletTransactionsTypeCustomer
    );
  }

  GetReceiptType() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getReceiptType
    );
  }

  GetReasion() {
    return this.get(this.apiBaseController + ApiApplication.system.getReasion);
  }

  GetReasionCustomer() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getReasionCustomer
    );
  }

  GetPaymentType() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getPaymentType
    );
  }

  GetReceiptStatus() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getReceiptStatus
    );
  }

  GetUserStatus() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getUserStatus
    );
  }

  getOrderStatus() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getOrderStatus
    );
  }

  getComplainStatus() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getComplainStatus
    ).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getComplainTypes() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getComplainType
    ).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getListSex() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getListSex
    ).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getListLevel() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getListLevel
    ).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getAttachFileType() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getAttachFileType
    );
  }

  getAllCountry() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getCountry
    ).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getAreaByParent(parentId) {
    return this.get(
      this.apiBaseController + "getAreaByParent?parentId=" + parentId
    ).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getWarehouseVN() {
    // kho nhận hàng
    return this.get(this.apiBaseController + "getWarehouseVN").pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getListConsignmentWarehouse() {
    // kho kí gửi
    return this.get(this.apiBaseController + "getConsignmentWarehouse").pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getShippingType() {
    // danh sách thông tin khai báo
    return this.get(
      ApiApplication.service.controller + "/getLsServiceGroupOrderConsignment"
    ).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getReferralProgramStatus() {
    return this.get(
      this.apiBaseController + ApiApplication.system.getReferralProgramStatus
    ).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getReferralProgramUserStatus() {
    return this.get(
      this.apiBaseController +
        ApiApplication.system.getReferralProgramUserStatus
    ).pipe(
      map((res: any) => {
        if (res.message === "successful") {
          // success -->
          return res.result.data;
        } else {
          return throwError("cant get");
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
