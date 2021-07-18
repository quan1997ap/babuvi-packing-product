import { Shipment } from "./shipment.model";

export class DeliveryRequest {
    deliveryRequestId;
    deliveryRequestCode;
    type;
    typeDisplay;
    contactName;
    contactPhone;
    address;
    country;
    countryDisplay;
    city;
    cityDisplay;
    district;
    districtDisplay;
    ward;
    wardDisplay;
    description;
    vehicleName;
    vehiclePhone;
    vehicleAddress;
    userId;
    createdDate;
    createdUser;
    changeDate;
    changeUserId;
    warehouseId;
    warehouseName;
    status;
    statusDisplay;
    missingAmount;
    walletAmount;
    warehouseExp;
    shipment: Shipment[] = [new Shipment()];
    lsParentDetail: any[];
    lsDetail: any[];
}