import { ItemsOnShop } from "./items-on-shop.model";
import { LstServiceCart } from "./lstServiceCart.model";

export class AllLstCart {
    cartId: number = 0;
    shopId: string = "";
    shopName: string = "";
    shopLink: string = "";
    aliwangwang: string = "";
    website: string = "";
    version: string = "";
    description: string = "";
    shippingType: number = 0;
    userId: number = 0;
    totalPrice: number = 0;
    status: number = 0;
    createdDate: string = "";
    items: ItemsOnShop[] = new Array<ItemsOnShop>();
    lstServiceCart: LstServiceCart[] = new Array<LstServiceCart>();
    isCheckedShop?: boolean = true;
}