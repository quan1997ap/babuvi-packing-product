import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { lstAddress } from 'app/model/lstAddress.model';
import { lstCountry } from 'app/model/country.model';
import { CartServices } from 'app/services/cart.services';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewAddress, ValidateAddress } from 'app/model/new-address.model';

@Component({
    selector: 'app-edit-address',
    templateUrl: './edit-address.component.html',
    styleUrls: ['./edit-address.component.scss'],
    encapsulation: ViewEncapsulation.None 
})
export class EditAddressDialogComponent implements OnInit {
    title: string;
    message: string;

    receiverName: string;
    receiverPhone: string;
    receiverEmail: string;
    receiverCity: string;
    receiverDistrict: string;
    receiverAddress: string;
    receiverDescription: string;

    district: lstCountry[] = [];
    ward: lstCountry[] = [];
    lstDataCountry: lstCountry[] = [];
    nation: lstCountry[] = [];
    nationDisplay: string = null;
    nationId: number = null;

    dpInfomation: FormGroup;

    cityId: number = null
    districtId: number = null;
    validate: ValidateAddress;
    
    constructor(
        private fb: FormBuilder,
        private cdref: ChangeDetectorRef,
        private _cartServices: CartServices,
        public dialogRef: MatDialogRef<EditAddressDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
          this.initValue();
    }

    ngOnInit() {
      this.dpInfomation = this.fb.group({
        dpInfoCity: ['', Validators.required],
        dpInfoDistrict: ['', Validators.required],
        dpInfoWards: ['', Validators.required]
      })
    }

    ngAfterViewInit() {
        this.setAddress(this.data.item.lstItem);
    }

    initValue() {
      this.receiverName = "";
      this.receiverPhone = "";
      this.receiverEmail = "";
      this.receiverCity = null;
      this.receiverDistrict = null;
      this.receiverAddress = "";
      this.receiverDescription = "";
      this.districtId = 0;
      this.cityId = 0;

      this.district = [];
      this.lstDataCountry = [];
      this.nation = [];

      this.newAddress = new NewAddress();
      this.validate = new ValidateAddress();
    }

    userId: number = 0;
    // cityDisplay: string = null;
    deliveryCode: string = null;
    deliveryId: number = null;

    setAddress(itemAddress: NewAddress) {
      this.userId = itemAddress.UserId;
      this.receiverName = itemAddress.Receiver;
      this.receiverPhone = itemAddress.Phone;
      this.receiverEmail = itemAddress.Email;
      this.nationId = itemAddress.country;
      this.nationDisplay = itemAddress.countryDisplay;
      this.cityId = itemAddress.City;
      this.receiverCity = itemAddress.cityDisplay;
      this.receiverDistrict = itemAddress.districtDisplay;
      this.districtId = itemAddress.District;
      this.WardsId = itemAddress.ward;
      this.wardsDisplay = itemAddress.wardDisplay;
      this.receiverAddress = itemAddress.Address;
      this.receiverDescription = itemAddress.Description;
      this.deliveryCode = itemAddress.deliveryAddressCode;
      this.deliveryId = itemAddress.deliveryAddressId;

      this.getNational();
      this.getCountry(itemAddress.City);
      this.getDistrict(itemAddress.City, itemAddress.District);
      this.getWards(itemAddress.District, itemAddress.ward);
      this.cdref.detectChanges();
    }
    
    newAddress: NewAddress;
    reSetDataAddress() {
      this.newAddress.UserId = this.userId;
      this.newAddress.Receiver= this.receiverName;
      this.newAddress.Phone = this.receiverPhone;
      this.newAddress.Email = this.receiverEmail;
      this.newAddress.country = this.nationId;
      this.newAddress.countryDisplay = this.nationDisplay;
      this.newAddress.City = this.cityId;
      this.newAddress.cityDisplay = this.receiverCity;
      this.newAddress.District = this.districtId;
      this.newAddress.districtDisplay = this.receiverDistrict;
      this.newAddress.ward = this.WardsId;
      this.newAddress.wardDisplay = this.wardsDisplay;
      this.newAddress.Address = this.receiverAddress;
      this.newAddress.Description = this.receiverDescription;
      this.newAddress.deliveryAddressCode = this.deliveryCode;
      this.newAddress.deliveryAddressId = this.deliveryId;
      console.log(this.newAddress);
    }

    isExist(str: string|number): boolean {
      if(str && String(str).length !== 0) return true;
      else return false;
    }

    checkName(event) {
      if (this.isExist(event)) {
        this.validate.ckReceiver = false;
        this.validate.smgReceiver = null;
      }
    }

    checkPhone(event) {
      if (this.isExist(event)) {
        this.validate.ckAddress = false;
        this.validate.smgAddress = null;
      }
    }

    checkAddress(event) {
      if (this.isExist(event)) {
        this.validate.ckPhone = false;
        this.validate.smgPhone = null;
      }
    }

    validateAddess(): boolean {
      if(!this.isExist(this.newAddress.Receiver)) {
        this.validate.ckReceiver = true;
        this.validate.smgReceiver = "Bạn chưa nhập tên";

        return true;
      }

      if(!this.isExist(this.newAddress.Phone)){
        this.validate.ckPhone = true;
        this.validate.smgPhone = "Bạn chưa nhập Số điện thoại";

        return true;
      }

      const t1 = !this.isExist(this.newAddress.City);
      if(!this.isExist(this.newAddress.City)){
        this.validate.ckCity = true;
        this.validate.smgCity = "Bạn chưa chọn thành phố";

        return true;
      }

      if(!this.isExist(this.newAddress.District)){
        this.validate.ckDistrict = true;
        this.validate.smgDistrict = "Bạn chưa chọn quận huyện";

        return true;
      }

      if(!this.isExist(this.newAddress.ward)){
        this.validate.ckWard = true;
        this.validate.smgWard = "Bạn chưa chọn phường xã";

        return true;
      }

      if(!this.isExist(this.newAddress.Address)){
        this.validate.ckAddress = true;
        this.validate.smgAddress = "Bạn chưa chọn địa chỉ";

        return true;
      }

      return false;
    }

    changeCountry(event: any) {
      // console.log(event); chưa cần change
    }
 
    changeCity(event: any) {
      if (event) {
        this.getDistrict(event.areaId);
        this.receiverCity  = event.areaName;
        this.cityId = event.areaId;
        this.validate.ckCity = false;
        this.validate.smgCity = null;
      } else {
        this.receiverCity = null;
        this.cityId = null;
        this.district = [];
        this.receiverDistrict = null;
        this.districtId = null;
        this.ward = []
        this.wardsDisplay = null;
        this.WardsId = null;
      }
      this.cdref.detectChanges();
    }
 
    changeDistrict(event: any) {
      if (event) {
        this.getWards(event.areaId);
        this.receiverDistrict = event.areaName;
        this.districtId = event.areaId;
        this.validate.ckDistrict = false;
        this.validate.smgDistrict = null;
      } else {
        this.district = [];
        this.receiverDistrict = null;
        this.districtId = null;
        this.ward = []
        this.wardsDisplay = null;
        this.WardsId = null;
      }
    }

    wardsDisplay: string = null;
    WardsId: number = null;
    changeWards(event: any) {
      if (event) {
        this.wardsDisplay = event.areaName;
        this.WardsId = event.areaId;
        this.validate.ckWard = false;
        this.validate.smgWard = null;
      } else {
        this.ward = []
        this.wardsDisplay = null;
        this.WardsId = null;
      }
    }

    // Hàm load quốc gia
     getNational() {
      this._cartServices.getCountry().subscribe( res => {
        this.nation = res.result.data;
      });
     }
  
     getCountry(id?: number) {
      this._cartServices.getOtherDistance(1).subscribe( res => {
        this.lstDataCountry = res.result.data;
        let toSelect = this.lstDataCountry.find(c => c.areaId === id);
        this.dpInfomation.get('dpInfoCity').setValue(toSelect);
      });
     }
  
     getDistrict(id: number, areaId?: number) {
      this._cartServices.getOtherDistance(id).subscribe( res => {
        this.district = res.result.data;
        // set show 
        if(areaId) {
          let toSelect = this.district.find(c => c.areaId === areaId);
          this.dpInfomation.get('dpInfoDistrict').setValue(toSelect);
        }
      });
     }

     getWards(id: number, areaId?: number) {
      this._cartServices.getOtherDistance(id).subscribe( res => {
        this.ward = res.result.data;
        // set show 
        if(areaId) {
          let toSelect = this.ward.find(c => c.areaId === areaId);
          this.dpInfomation.get('dpInfoWards').setValue(toSelect);
        }
      });
     }

     updateAddress(): void {
      this.reSetDataAddress();
      const tv = this.validateAddess();
      if(!tv) {
        this.dialogRef.close(this.newAddress);
      }
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}
