import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './common/http.service';
import { ApiApplication, paging } from 'app/config/app.config';
import { ApiService } from './common/api.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class RightService extends ApiService {
    constructor(http: HttpService, _router: Router ) {
        super(ApiApplication.right.controller, http, _router);
    }

    getListRight() {
        return this.get(this.apiBaseController + ApiApplication.right.getListRight).pipe(map((res: any) => {
            if (res.message === 'successful') {
                // success -->
                return res.result.data;
            } else {
                return throwError('cant get');
            }
        }), catchError(error => {
            return throwError(error);
        }));
    }


}