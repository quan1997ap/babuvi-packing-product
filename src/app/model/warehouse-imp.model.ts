import {WarehouseImpDetail} from './warehouse-imp-detail.model';


export class WarehouseImp {
    warehouseImpId;
    warehouseImpCode;
    warehouseExpId;
    warehouseExpCode;
    warehouseId;
    expWarehouseId;
    impDate;
    storekeeperId;
    type;
    status;
    createdUserId;
    changeUserId;
    lsDetail: WarehouseImpDetail[];
}
