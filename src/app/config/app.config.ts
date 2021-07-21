export const Module = "babuvi";
//export const ApiBaseUrl = "https://backenddl.babuvi.com/api/";
export const ApiBaseUrl = "https://backendhuy.babuvi.com/api/";
//export const ApiBaseUrl = "http://localhost:5000/api/";
export const APP_NAME = 'Babuvi';
export const MessageType = {
    Default: 'default',
    Info: 'info',
    Success: 'success',
    Wait: 'wait',
    Error: 'error',
    Warning: 'warning',
};

export const ApDomainType = {
    AllType: '00',
    UserSetting: '01',
    LevelUser: '02',
    UserType: '03',
    ReceiptType: '04',
    PaymentType: '05',
    ReceiptStatus: '06',
    OrderStatus: '07',
    SystemSetting: '08',
    TaskType: '09',
    TaskStatus: '10',
    AssignStatus: '11',
    CartItemStatus: '12',
    PaymentStatus: '13',
    OrderType: '14',
    WalletTransactionsType: '15',
    StatusBasic: '16',
    AmGenCodeType: '17',
    WithdrawalRequestStatus: '18',
    IsDefault: '19',
    FeeType: '20',
    ExchangeRateType: '21',
    ShippingType: '22',
    OrderSource: '23',
    MerchandiseWarehouseStatus: '24',
    ServiceGroupType: '25',
    IsOption: '26',
    Reasion: '27',
    IsAdmin: '28',
    WarehouseLocation: '29',
    UserStatus: '30',
    ControlType: '31',
    ChatRole: '32',
    TransactionStatus: '33',
    AreaType: '34',
    SymbolsLocation: '35',
    ComplainStatus: '36',
    ComplainType: '37',
    MerchandiseType: '38',
    DeliveryRequestType: '39',
    ServiceLocationDisplay: '40',
    WarehouseImpStatus: '41',
    WarehouseImpType: '42',
    DeliveryRequestStatus: '43',
    AttachFileType: '44',
    WarehouseExpStatus: '45',
    WarehouseExpType: '46',
    CompanyProfile: '47',
    ShipmentStatus: '48',
    ShipmentType: '49',
    WarehouseExpDetailStatus: '50',
}

export const paging = {
    perPage: 15,
    page: 1
};

export const usersetting = {
    Kho_Nhan_Hang: "1",
    Level: "2",
    CareStaff: "3",
    OrderStaff: "4",
    DeliveryAddressDefault: "5",
    Ty_Le_Quy_Doi_Can_Nang: "6"
    
}

export const ShiftStatus = {
    STATUS_APPROVED: 1,
    STATUS_WAITING_APPROVE: 2,
    STATUS_EDIT_REQUESTED: 3,
    STATUS_DELETE_REQUESTED: 4,
};

export const ReceiptStatus = {
    CHOXACNHAN: 1,
    XACNHAN: 2,
    HUY: 3
}

export const PageSize = 20;

export const ApiApplication = {
    lstUserItem: {
        controller: ApiBaseUrl + "user/",
        lstUser: 'getListUserCustomer/',
        page: 'page',
        perPage: 'perPage',
        common: ApiBaseUrl + 'control/',
        actionAccess: 'controlInForm?',
        actionParam1: 'usercode',
        actionParam2: 'path'
    },
    common: {
        menuUser: ApiBaseUrl + 'control/menuUserCode/15682'
    },
    login:  ApiBaseUrl + 'user/login',
    logout: ApiBaseUrl + 'user/logout',
    infoUser: ApiBaseUrl + 'user/getUserById/',
    walletByUserId: ApiBaseUrl + 'wallet/getWalletByUserId/',
    //getLsWallet: ApiBaseUrl + 'wallet/getLsWallet/',
    page: 'page',
    perPage: 'perPage',
    userId: 'userId',
    lServiceId: 'lServiceId',
    lCartId: 'lCartId',
    lCartServiceId: 'lCartServiceId',
    lCartItemId: 'lCartItemId',
    deliveryAddressId: 'deliveryAddressId',
    clientAppCode: 'exo-r9045HKopew8mnGj',
    //api/Extension/
    Extension: {
        controller: ApiBaseUrl + 'Extension',
        exchangerate: 'exchangerate'
    },
    receipt: {
        controller: ApiBaseUrl + 'Receipt',
    },
    right: {
        controller: ApiBaseUrl + 'Right',
        getListRight: 'getListRight',
    },
    receiptTopup: {
        controller: ApiBaseUrl + 'Receipt/lsReceiptTopup/',
        page: 'page',
        perPage: 'perPage',
        destroy: ApiBaseUrl + 'wallet/destroyTopup/'
    },
    ODER_DETAIL: {
        get: ApiBaseUrl + "Order/getDataOrderFull/",
        chat: ApiBaseUrl + 'Order/addNewChat'
    },
    shipManager: {
        controller: ApiBaseUrl + 'order',
        // allOrder: 'allorder/',
        cancelOrder: 'customerCancelOrder',
        searchOrderManager: 'searchOrderManager',
        searchOrderStaff: 'searchOrderStaff',
        searchOrder: 'searchOrder',
        searchOrderConsignment: 'searchOrderConsignment'
    },
    cart: {
        controller: ApiBaseUrl + 'cart',
        getCountry: ApiBaseUrl + 'System/GetCountry/',
        getAreaOther: ApiBaseUrl + 'System/getAreaByParent/',
        lstAllServicesOption: 'getLsServiceOrder/', 
        lstCart: 'getListCart/', 
        addFeeServices: 'CalFeeInCart',
        delPriceServices: 'deleteCartServiceById',
        deleteShopItem: 'deleteShopItem',
        deleteShop: 'deleteShop',
        getListDeliveryAddressByUserId: 'getListDeliveryAddressByUserId', 
        addDeliveryAddress: 'addDeliveryAddress/',
        deactiveDeliveryAddressById: 'deactiveDeliveryAddressById',
        DepositListOrder: 'DepositListOrder/', 
        getAllArea: 'getAllArea',
        depositLsProduct: "depositLsProduct",
        UpdateNoteItem: 'UpdateNoteItem/',
        UpdateNoteCart: 'UpdateNoteCart/',
        UpdateQuanlity: 'UpdateQuantity/',
        updateDeliveryAddress: 'updateDeliveryAddress/',
        AddToCartBasic: 'AddToCartBasic',
        AddCouponCart: "AddCouponCart"
    },
    task: {
        controller: ApiBaseUrl + 'task',
    },
    fileManager: {
        controller: ApiBaseUrl + "fileManager",
        upLoadImageOneDrive: "upLoadImageOneDrive",
        upLoadAttachFileOneDrive: "upLoadAttachFileOneDrive",
        refreshImageAttachFile: "refreshImageAttachFile",
        refreshImageByOrderId: "refreshImageByOrderId",
        refreshImageByCartId: "refreshImageByCartId"
    },
    compplain: {
        controller: ApiBaseUrl + 'complain',
    },
    // Use for Merchandise Component
    merchandise: {
        controller: ApiBaseUrl + 'merchandise',
        addMerchandise: 'addmerchandise/',
        getMerchandiseViewModel: 'getmerchandiseviewmodel/',
        getMerchandiseHistory: 'getmerchandisehistory/',
        deleteMerchandise: 'deleteLsMerchandise/',
        countSumMerchandiseInWarehouse: 'countSumMerchandiseInWarehouse/',
        getMerchandiseInWarehouse: 'getMerchandiseInWarehouse/',
        getMerchandiseInWarehouseManager: 'getMerchandiseInWarehouseManager/',
        getLsMerchandiseByMWId: 'GetLsMerchandiseByMWId/',
        addDeliveryRequest: 'adddeliveryrequest/',
        getDeliveryRequestByCode: 'getDeliveryRequestByCode/',
        refreshImageDeliveryRequest: 'refreshImageDeliveryRequest',
        createPackage: 'createPackage/',
        deletePackage: 'deletePackage',
        sendDelivery: 'sendDelivery/',
        cancelDelivery: 'cancelDelivery/',
        getDeliveryAddressDefault: 'getDeliveryAddressDefault/',
        getLsMerchandiseInWhByOrderId: 'getLsMerchandiseInWhByOrderId/',
        getMerchandiseByCode:'getMerchandiseByCode/',
        startHandleDeliveryRequest: "/startHandleDeliveryRequest/",
        finishHandleDeliveryRequest: "/finishHandleDeliveryRequest/",
        cancelHandleDeliveryRequest: "/cancelHandleDeliveryRequest",
        changeStatusDeliveryRequestDetail: "/changeStatusDeliveryRequestDetail",
        getLsTransporter:"/getLsTransporter",
        updateShipment:"updateShipment",
        addOrUpdateShipment: "addOrUpdateShipment",
        deleteShipment: "/deleteShipment",
        finishShipment: "/finishShipment"
    },
    paymentRequest: {
        controller: ApiBaseUrl + "paymentRequest",
        searchPaymentRequest: "/searchPaymentRequest",
        calPaymentRequest: "/calPaymentRequest",
        addCouponPaymentRequest: "/addCouponPaymentRequest",
        getPaymentRequestById: "/getPaymentRequestById"
      },
    system: {
        controller: ApiBaseUrl + 'system',
        getOrderStatus: 'getorderstatus/',
        getWarehouseImpStatus: 'getWarehouseImpStatus/',
        getWarehouseExpStatus: 'getWarehouseExpStatus/',
        getAllWarehouse: 'getallwarehouse',
        getDeliveryRequestType: 'getDeliveryRequestType',
        getPaymentShipType:'getPaymentShipType',
        getAllArea: 'getallarea',
        GetCountry: 'getcountry',
        getAreaByParent: 'getareabyparent',
        getVerticalMenu: 'getVerticalMenu',
        getWarehouseVN: 'getWarehouseVN/',
        getPaymentType: 'getPaymentType/',
        getPaymentStatus: 'getPaymentStatus/',
        getWalletTransactionsType: 'getWalletTransactionsType/',
        getWalletTransactionsTypeCustomer: 'getWalletTransactionsTypeCustomer/',
        getReceiptType: 'getReceiptType',
        getReasion: 'getReasion',
        getReasionCustomer: 'getReasionCustomer',
        getReceiptStatus: 'getReceiptStatus',
        getComplainStatus: 'getComplainStatus',
        getComplainType: 'getComplainType',
        getListSex: 'getListSex',
        getCountry: 'getCountry',
        getListLevel: 'getListLevel',
        getAttachFileType: 'getAttachFileType',
        getUserStatus: 'getUserStatus',
        // payment
        getPaymentRequestType: "/getPaymentRequestType",
        getPaymentRequestStatus: "/getPaymentRequestStatus",
        deletePaymentRequest: "/deletePaymentRequest",
        // getReferralProgram
        getReferralProgramStatus: "getReferralProgramStatus",
        getReferralProgramUserStatus: "getReferralProgramUserStatus"
        },
    service : {
      controller: ApiBaseUrl + "Service",
      getLsServicePackByUser: "/getLsServicePackByUser",
      paymentServicePack: "/paymentServicePack",
      calWithdrawalRequest: "/calWithdrawalRequest",
      getMyCoupon: "getMyCoupon",
      getCouponByCode: "getCouponByCode",
      getLsServiceGroupPaymentRequest: "/getLsServiceGroupPaymentRequest",
      getLsServiceGroupOrderConsignment: "/getLsServiceGroupOrderConsignment"
    },
    order: {
        controller: ApiBaseUrl + 'order',
        completeAddMerchandise: 'completeaddmerchandise/',
        getOrderViewModelById: 'getOrderViewModelById',
        payListOrder: 'paylistorder',
        getOrderBuy: 'getorderbuy/',
        addNewOrderService:'addNewOrderService',
        deleteOrderService:'deleteOrderService',
        saveOrderAfterBuy: 'saveorderafterbuy',
        completedBuyOrder: 'completedbuyorder',
        editOrderAfterCompleted: 'editOrderAfterCompleted',
        orderBuyRework: 'orderBuyRework',
        orderFinish:'orderFinish',
        startBuy: 'startbuy',
        getLsOrderPay: 'getlsorderpay',
        sumMissingAmount: 'sumMissingAmount',
        staffCancelOrder: 'staffCancelOrder',
        cancelOrderAfterBuy: 'cancelOrderAfterBuy',
    },
    warehouse: {
        controller: ApiBaseUrl + 'warehouse',
        saveWarehouseImp: 'savewarehouseimp',
        completeWarehouseImp: 'completewarehouseimp',
        getWarehouseExpByCode: 'getwarehouseexpbycode',
        getWarehouseImpViewById: 'getwarehouseimpviewbyid',
        deleteLsImpDetail: 'deletelsimpdetail',
        createWarehouseExpByDeliveryRequest: 'createWarehouseExpByDeliveryRequest/',
        cancelWarehouseExp: 'cancelWarehouseExp/',
        saveWarehouseExp: 'saveWarehouseExp',
        getWarehouseExpById: 'getWarehouseExpById',
        deleteLsExpDetail: 'deleteLsExpDetail',
        completeWarehouseExp: 'completeWarehouseExp'
    },
    user: {
        controller: ApiBaseUrl + 'user',
        getListStorekeeperInWarehouse: 'getliststorekeeperinwarehouse',
        regUserCustomer: 'regUserCustomer/',
        addOrUpdateUserCustomer: 'addOrUpdateUserCustomer',
        refreshToken: '/refreshToken',
        getUserById: 'getUserById',
        changePass: 'changePass',
        getInfoUser: 'getInfoUser',
        getInfoUserById: 'getInfoUserById',
        getListUserStaff: 'getListUserStaff',
        comfirmFollowZalo:'comfirmFollowZalo',
        CheckConnectedZalo: 'CheckConnectedZalo',
        SearchUserCustomer: 'searchUserCustomer',
        getCaptcha: "getCaptcha",
        getLsNotification: "getLsNotification",
        turnOffNotification: "turnOffNotification",
        turnOnNotification: "turnOnNotification"
    },
    wallet: {
        controller: ApiBaseUrl + "wallet",
        //load số tiền trong ví
        getWalletInforById: "getWalletInforById/",
        //Hàm load danh sách giao dịch
        getWalletTransaction: "getWalletTransaction/",
        getWalletByUserId: "getWalletByUserId",
        getLsWallet: '/getLsWallet',
        getTopupCode: 'getTopupCode',
        Topup: 'Topup',
        searchWalletTransaction: 'searchWalletTransaction/',
        getLsUserBank: '/getLsUserBank',
        addOrUpdateUserBank: "/addOrUpdateUserBank",
        addWithdrawalRequest: "/addWithdrawalRequest",
        deleteUserBank: "/deleteUserBank"
    },
    print: {
        controller: ApiBaseUrl + 'print',
        printWarehouseExp: 'printWarehouseExp',
        printDeliveryRequest: 'printDeliveryRequest',
        printShipByDeliveryRequest: 'printShipByDeliveryRequest',
        printShipmentById: "printShipmentById"
    },
    referralProgram: {
      controller: ApiBaseUrl + "ReferralProgram",
      searchReferralProgram: "/searchReferralProgram",
      getReferralProgram: "/getReferralProgram",
      getLsBannerDesignByBannerId: "/getLsBannerDesignByBannerId",
      searchReferralProgramUser: "/searchReferralProgramUser",
      getLsReferralProgramByUser: "/getLsReferralProgramByUser",
      UpdateClickReferralLink: "/UpdateClickReferralLink"
  },
};

export const NavigateRouting = {
    Relative: 'relative',
    Admin: 'admin',
    ChooseCompany: 'choose-company',
    NotFound: '404'
};

export const HttpStatus = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    AMBIGUOUS: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    I_AM_A_TEAPOT: 418,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505
};
