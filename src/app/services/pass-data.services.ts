import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InfoRating } from 'app/model/info-rating.model';
import { ShipOrders } from 'app/model/ship-orders.model';

@Injectable()
export class PassDataService {
    
    constructor() {}
    
    private dataStringSource = new BehaviorSubject<InfoRating>(undefined);

    setInfo(user: any) {
        this.dataStringSource.next(user);
    }

    getInfo() {
        return this.dataStringSource.asObservable();
    }

// ==========================================================================================
    private loadingSource = new BehaviorSubject<boolean>(undefined);

    loading(flag: boolean) {
        this.loadingSource.next(flag);
    }

    loaded() {
        return this.loadingSource.asObservable();
    }

// ==========================================================================================
    private loadingOrdersSource = new BehaviorSubject<ShipOrders>(undefined);

    setOrders(user: any) {
        this.loadingOrdersSource.next(user);
    }

    getOrders() {
        return this.loadingOrdersSource.asObservable();
    }
  
}