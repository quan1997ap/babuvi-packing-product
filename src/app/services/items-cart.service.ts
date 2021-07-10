import { Injectable } from '@angular/core';
import { Observable,Subject, BehaviorSubject} from 'rxjs';
import { ItemsOnShop } from 'app/model/items-on-shop.model';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class ItemsCartService {
    private subject = new Subject<ItemsOnShop[]>();
    private data: ItemsOnShop[] = []

    constructor (private router: Router){}


    private messageSource = new BehaviorSubject(this.data);
    currentMessage = this.messageSource.asObservable();
  
    changeMessage(message: ItemsOnShop[]) {
      this.messageSource.next(message);
      this.router.navigate(['/cart/pharse2'])
    }
}