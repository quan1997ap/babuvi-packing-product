export class DeliveryRequest {
    DeliveryRequestId;
    DeliveryRequestCode;
    Type;
    TypeDisplay;
    ContactName;
    ContactPhone;
    Address;
    Country;
    City;
    District;
    Ward;
    Description;
    VehicleName;
    VehiclePhone;
    VehicleAddress;
    UserId;
    CreatedDate;
    CreatedUser;
    ChangeDate;
    ChangeUserId;
    WarehouseId;
    Status;
    missingAmount;
    lsDetail: DeliveryRequestDetail[];
}
export class DeliveryRequestDetail {
    MerchandiseWarehouseId;
    WarehouseId;
}