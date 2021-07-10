import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './common/api.service';
import { HttpService } from './common/http.service';
import { ChatDTO } from 'app/model/dto/chat.model';
import { ApiApplication } from 'app/config/app.config';

@Injectable()
export class OrderDetailService extends ApiService {
    constructor(http: HttpService, _router: Router) {
        super(ApiApplication.ODER_DETAIL.get, http, _router);
    }

    getOrderDetail(id: number) {
        return this.get(ApiApplication.ODER_DETAIL.get + id);
    }

    postChat(chatDTO: ChatDTO) {
        return this.post(ApiApplication.ODER_DETAIL.chat, chatDTO);
    }
}
