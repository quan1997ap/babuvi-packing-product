import { PaymentRequestSearchModel } from "./../model/payment-request.model";
import { ApiBaseUrl } from "./../config/app.config";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "./common/http.service";
import { ApiApplication, paging } from "app/config/app.config";
import { ApiService } from "./common/api.service";

export class BankAccountModal {
  userBankId?: string | number;
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankBranch: string;
  cityId: string | number;
  countryId: string;
}

export class WithdrawalRequestModel {
  withdrawalRequestId: number;
  userId: number;
  walletId: number;
  bank: string;
  maxWithdrawAmount: number;
  withdrawAmount: number;
  withdrawalFee: number;
  totalAmount: number;
  currencyId: number;
  status: number;
  userBankId: number;
}
@Injectable()
export class WithdrawalService extends ApiService {
  constructor(http: HttpService, _router: Router) {
    super(ApiApplication.shipManager.controller, http, _router);
  }

  addWithdrawalRequest(params: WithdrawalRequestModel) {
    return this.post(
      ApiApplication.wallet.controller +
        ApiApplication.wallet.addWithdrawalRequest,
      params
    );
  }

  getLsWallet() {
    return this.get(
      ApiApplication.wallet.controller + ApiApplication.wallet.getLsWallet
    );
  }

  calWithdrawalRequest(params){
    return this.post(
      ApiApplication.service.controller + ApiApplication.service.calWithdrawalRequest, params
    );
  }

  // UserBank
  getLsUserBank() {
    return this.get(
      ApiApplication.wallet.controller + ApiApplication.wallet.getLsUserBank
    );
  }

  addOrUpdateUserBank(prams: BankAccountModal) {
    return this.post(
      ApiApplication.wallet.controller +
        ApiApplication.wallet.addOrUpdateUserBank,
      prams
    );
  }

  deleteUserBank(userBankId) {
    return this.put(
      ApiApplication.wallet.controller +
        ApiApplication.wallet.deleteUserBank +
        `?userBankId=${userBankId}`
    );
  }
}
