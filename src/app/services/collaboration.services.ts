import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "./common/http.service";
import { ApiApplication } from "app/config/app.config";
import { ApiService } from "./common/api.service";
@Injectable()
export class CollaborationServices extends ApiService {
  constructor(http: HttpService, _router: Router) {
    super(ApiApplication.referralProgram.controller, http, _router);
  }

  searchReferralProgram(querySearch, page, perPage) {
    return this.post(
      ApiApplication.referralProgram.controller +
        ApiApplication.referralProgram.searchReferralProgram +
        `/${perPage}/${page}`,
      querySearch
    );
  }

  getReferralProgram(referralProgramUserId) {
    return this.get(
      ApiApplication.referralProgram.controller +
        ApiApplication.referralProgram.getReferralProgram +
        `/${referralProgramUserId}`
    );
  }

  getLsBannerDesignByBannerId(programBannerId) {
    return this.get(
      ApiApplication.referralProgram.controller +
        ApiApplication.referralProgram.getLsBannerDesignByBannerId +
        `/${programBannerId}`
    );
  }

  searchReferralProgramUser(
    querySearch: {
      UserId: string;
      StartDate: any;
      ReferralProgramUserId: string;
      ReferralOrderStatus: string;
    },
    perPage,
    page
  ) {
    return this.post(
      ApiApplication.referralProgram.controller +
        ApiApplication.referralProgram.searchReferralProgramUser +
        `/${perPage}/${page}`,
      querySearch
    );
  }

  getLsReferralProgramByUser(){
    return this.get(
      ApiApplication.referralProgram.controller +
        ApiApplication.referralProgram.getLsReferralProgramByUser
    );
  }

  updateClickReferralLink(referralCode){
    return this.put( ApiApplication.referralProgram.controller + 
      ApiApplication.referralProgram.UpdateClickReferralLink +`?referralCode=${referralCode}` )
  }
}
