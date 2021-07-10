export class NewAddress {
    UserId: number = 0;
    Receiver: string = "";
    Phone: string = "";
    Email: string = "";
    country: number = 0;
    countryDisplay: string = null;
    City: number = 0;
    cityDisplay: string = null;
    District: number = 0;
    districtDisplay: string = null;
    ward: number = 0;
    wardDisplay: string = null;
    Address: string = "";
    Description: string = "";
    deliveryAddressCode: string = null;
    deliveryAddressId: number = null;
    isDefault: boolean;
    // validate: ValidateAddress = new ValidateAddress();
}

export class ValidateAddress {
    ckReceiver: boolean = false;
    ckPhone: boolean = false;
    ckCity: boolean = false;
    ckDistrict: boolean = false;
    ckWard: boolean = false;
    ckAddress: boolean = false;

    smgReceiver: string = null;
    smgPhone: string = null;
    smgCity: string = null;
    smgDistrict: string = null;
    smgWard: string = null;
    smgAddress: string = null;
}