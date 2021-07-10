export class ComplainTypeModel {
    apDomainId: number;
    code: string;
    displayValue: string;
    ord: any;
    shortDisplay: any;
    status: any;
    type: any;
    value: string;
}

export class ComplainStatusModel {
    apDomainId: number;
    code: string;
    displayValue: string;
    ord: any;
    shortDisplay: any;
    status: any;
    type: any;
    value: string;
}

export class ComplainModel {
    ComplainId: number;
    OrderId: number | string;
    OrderCode: string;
    OrderDetailId: number;
    ItemCode: string;
    ComplainType: string;
    ComplainContent: string;
    ComplainSettle: string;
    Status: number;
}