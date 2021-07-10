import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from './common/http.service';
import {ApiApplication} from 'app/config/app.config';
import {ApiService} from './common/api.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class ComplaintServices extends ApiService {
    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.compplain.controller, http, _router);
    }


    getCompainById(compainId) {
        return this.get(this.apiBaseController + `getCompainById?compainId=${compainId}`);
    }

    getCompainByIdManager(compainId) {
        return this.get(this.apiBaseController + `getCompainByIdManager?compainId=${compainId}`);
    }

    getComplaintByOrderId(orderId) {
        return this.get(this.apiBaseController + `getCompainByOrderId?orderId=${orderId}`);
    }

    getComplaints(pageIndex, pageSize, filter?) {
        /*
            const filter = {
                ComplainCode: complainCode,
                OrderCode: orderCode,
                ItemCode: itemCode,
                StartDate: startDate,
                EndDate: endDate,
                ComplainStatus: complainStatus
            };
        */
        const params = new Object({});
        if (filter) {
            Object.keys(filter).forEach(key => {
                if (filter[key] !== '' && filter[key] !== null && filter[key] !== undefined) {
                    params[key] = filter[key];
                }
                // ISO 8601 Extended format + Z is not present, it’ll be Local Time.
                if (key === 'StartDate' && filter[key]) {
                    params[key] = moment(filter[key]).format('YYYY-MM-DDT00:00:00');
                    console.log( params[key])
                }
                if (key === 'EndDate' && filter[key]) {
                    params[key] = moment(filter[key]).format('YYYY-MM-DDT23:59:59');
                    console.log( params[key])

                }
            })
        }
        return this.post(this.apiBaseController + `searchCompain?page=${pageIndex}&perPage=${pageSize}`, params);
    }

    getComplaintsManager(pageIndex, pageSize, filter?) {
        /*
            const filter = {
                ComplainCode: complainCode,
                OrderCode: orderCode,
                ItemCode: itemCode,
                StartDate: startDate,
                EndDate: endDate,
                ComplainStatus: complainStatus
            };
        */
        const params = new Object({});
        if (filter) {
            Object.keys(filter).forEach(key => {
                if (filter[key] !== '' && filter[key] !== null && filter[key] !== undefined) {
                    params[key] = filter[key];
                }
                // ISO 8601 Extended format + Z is not present, it’ll be Local Time.
                if (key === 'StartDate' && filter[key]) {
                    params[key] = moment(filter[key]).format('YYYY-MM-DDT00:00:00');
                    console.log( params[key])
                }
                if (key === 'EndDate' && filter[key]) {
                    params[key] = moment(filter[key]).format('YYYY-MM-DDT23:59:59');
                    console.log( params[key])

                }
            })
        }
        return this.post(this.apiBaseController + `searchCompainManager?page=${pageIndex}&perPage=${pageSize}`, params);
    }

    sendComplaint(complaintData) {
        return this.post(this.apiBaseController +  'addComplain', complaintData)
    }

    cancelLsComplains(compaintIds) {
        const params = {
            lsId: compaintIds
        };
        return this.put(this.apiBaseController +  `cancelLsComplain`, params);
    }

    getCompainByOrderId(orderId) {
        return this.get(this.apiBaseController + `getCompainByOrderId/${orderId}`).pipe(map((res: any) => {
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