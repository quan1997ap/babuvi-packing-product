export class Merchandise {
    merchandiseId: number;
    merchandiseCode: string;
    orderId: number;
    netWeight: number;
    chargedWeight: number;
    paymentWeight: number;
    length: number;
    width: number;
    height: number;
    status: string;
    statusDisplay: string;
    type: string;
    createdDate: Date;
    changeDate: Date;
    createdUserId: number;
    warehouseId: number;
    warehouseCode: string;
    warehouseName: string;
    shelfPosition;
    orderCode: string;
    impDate: Date;
}

export class MerchandiseAddPrams {
    createdUserId: number;
    OrderCode: string;
    merchandiseCode: string;
  }