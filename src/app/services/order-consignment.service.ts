import { ApiBaseUrl, ApiApplication, paging } from './../config/app.config';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './common/http.service';
import { ApiService } from './common/api.service';
import { User } from '../model/user.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class OrderConsignmentService extends ApiService {

    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.user.controller, http, _router);
    }

    

    addOrderConsignment(addOrderConsignment) {
        return this.post(ApiApplication.order.controller + '/addOrderConsignment', addOrderConsignment);
    }

    getLsServiceGroupOrderConsignment() {
        // danh sách thông tin khai báo
        return this.get(
            ApiApplication.service.controller +
              ApiApplication.service.getLsServiceGroupOrderConsignment).pipe(
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
