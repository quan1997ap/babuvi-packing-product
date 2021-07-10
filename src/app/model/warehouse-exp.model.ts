import {WarehouseExpDetail} from './warehouse-exp-detail.model';

export class WarehouseExp {
    warehouseExpId;
    warehouseExpCode;
    expDate;
    expWarehouseId;
    expWarehouseName;
    expWarehousePhone;
    expWarehouseAddress;
    expWarehouseCountry;
    expWarehouseCity;
    expWarehouseDistrict;
    expWarehouseWard;
    warehouseId;
    storekeeperId;
    storekeeperFirstName;
    storekeeperLastName;
    deliveryRequestId;
    customerName;
    customerPhone;
    customerAddress;
    customerCountry;
    customerCity;
    customerDistrict;
    customerWard;
    type;
    typeDisplay;
    status;
    createdDate;
    changeDate;
    createdUserId;
    changeUserId;
    transporterId;
    transporterName;
    transporterPackageNumber;
    lsDetail: WarehouseExpDetail[];
}