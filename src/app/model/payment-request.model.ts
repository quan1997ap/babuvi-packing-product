export class PaymentRequestModel {
    serviceGroupId?: string;
    paymentRequestId?: number;
    paymentRequestCode?: string;
    paymentRequestDate?: Date;
    userId?: number;
    amountRequestExchange?: number;
    amountRequest?: number;
    totalFee?: number;
    totalAmount?: number;
    exchangeRate?: number;
    type?: string;
    status?: string;
    statusDisplay?: string;
    serviceId?: number;
    lsService?: PaymentServiceModel[];
    couponCode?: string;
    coupon ?: string;
  }
  
  export class PaymentRequestSearchModel {
    paymentRequestCode?: string;
    startDate?: Date;
    endDate?: Date;
    type?: string;
    status?: string;
    userCode?: string;
  }
  
  export class ServiceGroupPaymentRequestModel {
    description: null;
    groupName: string;
    groupType: string;
    isDefault: string;
    isInternal: string;
    serviceGroupId: number;
  }
  
  export class PaymentServiceModel {
    serviceId: number;
    serviceName: string;
    display: string;
    shortDisplay: string;
    description: string;
    groupType: string;
    groupOption: string;
    isOption: string;
    isDefault: string;
    isInternal: string;
    locationDisplay: string;
    feeType: string;
    status: string;
    ord: number;
    amount: number;
    isChecked: boolean;
  }
  
  