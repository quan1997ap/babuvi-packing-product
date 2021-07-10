import { ItemsOnShop } from "./items-on-shop.model";

export class BookingProductModel {
    UserId: number = 0;
    CustomerId: number = 0;
    DeliveryAddressId: number = 0;
    lsProduct: ItemsOnShop[] = [];
    validate: bookingValidate = new bookingValidate();
    Coupon: string = '';
}

export class bookingValidate {
    errAddress: boolean = false;
    messAddress: string = "";
}