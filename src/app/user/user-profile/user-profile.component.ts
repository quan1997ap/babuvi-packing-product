import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

// components
import { ConfirmDialogComponent } from 'app/common-view/confirm-dialog/confirm-dialog.component';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

// services
import { PassDataService } from 'app/services/pass-data.services';
import { UserService } from 'app/services/user.service';
import { SystemService } from 'app/services/system.services';
import { RightService } from 'app/services/right.services';
import { MessageService } from 'primeng/api';
// other
import { forkJoin, Observable } from 'rxjs';

// model
import { User } from '../../model/user.model';
import { lstCountry } from '../../model/country.model';

// libs
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile-component.html',
  styleUrls: ['./user-profile-component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {

  editUserProfileForm: FormGroup;
  currentUser = new User();
  msgs = [];
  loadDataSuccess = undefined;

  countryList: lstCountry[] = [];
  countryOptions = []; // for dropdown

  cityList: lstCountry[] = [];
  cityOptions = []; // for dropdown

  districtList: lstCountry[] = [];
  districtOptions = []; // for dropdon

  wardList: lstCountry[] = [];
  wardOptions = []; // for dropdon

  listSex = [];
  listSexOptions = []; // for dropdown

  listRight = [];
  listRightOptions = []; // for dropdown

  constructor(
    private formBuilder: FormBuilder,
    private _passData: PassDataService,
    private userService: UserService,
    private systemService: SystemService,
    private rightService: RightService,
    public cdr: ChangeDetectorRef,
    public messageService: MessageService
  ) {
  }
  ngOnInit() {
    this._passData.loading(true);
    this.userService.getInfoUser().subscribe(
      resUserInfor => {
        if (resUserInfor && resUserInfor.result && resUserInfor.result.success === true) {
          this.currentUser = resUserInfor.result.data;
          localStorage.setItem('userData', JSON.stringify(this.currentUser));
          this.getAllFormData();
        }
      },
      err => {
        this.loadDataSuccess = false;
      }
    );
    this.editUserProfileForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[^!@#$%^&*(),.?":{}|<>]*$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[^!@#$%^&*(),.?":{}|<>]*$')]),
      phone: new FormControl('', [Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      address: new FormControl('', [Validators.required]),
      birthday: new FormControl( new Date()),
      sex: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required]),
    });

    // reset message
    this.editUserProfileForm.valueChanges.subscribe(val => {
      this.msgs = [];
    });
  }


  getAllFormData() {
    this._passData.loading(true);
    forkJoin(
      this.systemService.getListSex(),
      this.rightService.getListRight(),
      this.getAddressComboboxs()
    ).subscribe(res => {
      if (res) {
        if (res[0] && res[0].length > 0) {
          this.listSex = res[0];
          this.listSexOptions = res[0].map((status: any) => ({ label: status.displayValue, value: status.value }))
        }
        if (res[1] && res[1].length > 0) {
          this.listRight = res[1];
          this.listRightOptions = res[1].map((item: any) => ({ label: item.description, value: item }));
        }
        // birthday : from string to Date
        const currentUser: any = _.cloneDeep(this.currentUser);
        currentUser.birthday = moment(currentUser.birthday).format() !== 'Invalid date' ? new Date(currentUser.birthday) : null;
        this.editUserProfileForm.patchValue(currentUser);
      }
      this.loadDataSuccess = true;
      this._passData.loading(false);
    }, error => {
      this._passData.loading(false);
      this.loadDataSuccess = false;
    });
  }

  getAddressComboboxs() {
    return new Observable(observer => {
      this.systemService.getAllCountry().subscribe(
        (resCountry: lstCountry[]) => {
          if (resCountry && resCountry.length > 0) {

            // get and mapping country
            this.countryList = resCountry;
            this.countryOptions = resCountry.map(country => ({ label: country.areaName, value: country.areaId }));

            // get and mapping city
            const userCountry = this.currentUser.country ? this.currentUser.country : this.countryOptions[0].value;
            this.systemService.getAreaByParent(userCountry).subscribe(
              (resCity: lstCountry[]) => {
                if (resCity && resCity.length > 0) {
                  this.cityList = resCity;
                  this.cityOptions = resCity.map(city => ({ label: city.areaName, value: city.areaId }));

                  // get and mapping district
                  const userCity = this.currentUser.city ? this.currentUser.city : this.cityOptions[0].value;
                  this.systemService.getAreaByParent(userCity).subscribe(
                    (resDistrict: lstCountry[]) => {
                      if (resDistrict && resDistrict.length > 0) {
                        this.districtList = resDistrict;
                        this.districtOptions = resDistrict.map(district => ({ label: district.areaName, value: district.areaId }));

                        const userDistrict = this.currentUser.district ? this.currentUser.district : this.districtOptions[0].value;
                        this.systemService.getAreaByParent(userDistrict).subscribe(
                          (resWard: lstCountry[]) => {
                            if (resWard && resWard.length > 0) {
                              this.wardList = resWard;
                              this.wardOptions = resWard.map(ward => ({ label: ward.areaName, value: ward.areaId }));
                              observer.next(true);
                              observer.complete();
                            }
                          },
                          errGetProvince => { this._passData.loading(false); observer.error('errGetWard') }
                        )

                      }
                    },
                    errGetProvince => { this._passData.loading(false); observer.error('errGetDistrict') }
                  )

                }
              },
              errGetProvince => { this._passData.loading(false); observer.error('errGetCity') }
            )

          }
        },
        errGetCountry => { this._passData.loading(false); observer.error('errGetCountry') }
      )
    })
  }

  onChangeDropdownAdress(type) {
    this._passData.loading(true);
    switch (type) {
      case 'country':
        // get and mapping city
        if (this.editUserProfileForm.value.country) {
          this.systemService.getAreaByParent(this.editUserProfileForm.value.country).subscribe(
            (resCity: lstCountry[]) => {
              // reset form
              this.cityList = [];
              this.cityOptions = [];
              this.editUserProfileForm.value.city = null;
              this.editUserProfileForm.patchValue(_.cloneDeep(this.editUserProfileForm.value));

              this.districtList = [];
              this.districtOptions = [];
              this.editUserProfileForm.value.district = null;

              this.wardList = [];
              this.wardOptions = [];
              this.editUserProfileForm.value.ward = null;

              if (resCity && resCity.length > 0) {
                this.cityList = resCity;
                this.cityOptions = resCity.map(city => ({ label: city.areaName, value: city.areaId }));
              }
              this._passData.loading(false);
            },
            errGetProvince => {
              this._passData.loading(false);
              this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Không lấy được danh sách thành phố' });
            }
          )
        } else {
          this._passData.loading(false);
        }
        break;

      case 'city':
        // get and mapping district
        if (this.editUserProfileForm.value.city) {
          this.systemService.getAreaByParent(this.editUserProfileForm.value.city).subscribe(
            (resDistrict: lstCountry[]) => {
              // reset form
              this.districtList = [];
              this.districtOptions = [];
              this.editUserProfileForm.value.district = null;

              this.wardList = [];
              this.wardOptions = [];
              this.editUserProfileForm.value.ward = null;

              this.editUserProfileForm.patchValue(_.cloneDeep(this.editUserProfileForm.value));
              if (resDistrict && resDistrict.length > 0) {
                this.districtList = resDistrict;
                this.districtOptions = resDistrict.map(district => ({ label: district.areaName, value: district.areaId }));
              }
              this._passData.loading(false);
            },
            errGetProvince => {
              this._passData.loading(false);
              this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Không lấy được danh sách dữ liệu quận/huyện' });

            }
          )

        } else {
          this._passData.loading(false);
        }
        break;

      case 'district':
        if (this.editUserProfileForm.value.district) {
          this.systemService.getAreaByParent(this.editUserProfileForm.value.district).subscribe(
            (resWard: lstCountry[]) => {
              // reset form
              this.wardList = [];
              this.wardOptions = [];
              this.editUserProfileForm.value.ward = null;

              if (resWard && resWard.length > 0) {
                this.wardList = resWard;
                this.wardOptions = resWard.map(ward => ({ label: ward.areaName, value: ward.areaId }));
              }
              this._passData.loading(false);
            },
            errGetProvince => {
              this._passData.loading(false);
              this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Không lấy được danh sách dữ liệu xã' });
            }
          )
        } else {
          this._passData.loading(false);
        }
        break;
    }
  }

  formValidate(formControlName, form) {
    switch (formControlName) {
      case 'firstName':
      case 'lastName':
      case 'phone':
      case 'email':
      case 'address':
      case 'country':
      case 'city':
      case 'district':
      case 'ward':
        if (form) {
          const formControl = form.get(formControlName);
          const patternControls = ['firstName', 'lastName', 'email', 'phone'];
          if (patternControls.includes(formControlName) && formControl.errors && formControl.errors.pattern) {
            return {
              error: true,
              type: 'pattern',
            }
          }
          if (formControl && formControl.errors && formControl.errors.minlength && formControl.errors.minlength.requiredLength) {
            return {
              error: true,
              type: 'minlength'
            }
          } else if (formControl && formControl.errors && formControl.errors.maxlength && formControl.errors.maxlength.requiredLength) {
            return {
              error: true,
              type: 'maxlength'
            }
          } else if (formControl && formControl.errors && formControl.errors.required) {
            return {
              error: true,
              type: 'required'
            };
          } else {
            return { error: false };
          }
        } else {
          return { error: false };
        }
        break;

      default:
        return { error: false };
        break;
    }
  }

  updateUserProfile() {
    this.msgs = [];
    const firstNameControl = this.formValidate('firstName', this.editUserProfileForm);
    const lastNameControl = this.formValidate('lastName', this.editUserProfileForm);
    const phoneControl = this.formValidate('phone', this.editUserProfileForm);
    const emailControl = this.formValidate('email', this.editUserProfileForm);
    const addressControl = this.formValidate('address', this.editUserProfileForm);
    const countryControl = this.formValidate('country', this.editUserProfileForm);
    const cityControl = this.formValidate('city', this.editUserProfileForm);
    const districtControl = this.formValidate('district', this.editUserProfileForm);
    const wardControl = this.formValidate('ward', this.editUserProfileForm);
    if (firstNameControl.error && firstNameControl.error === true) {
      if (firstNameControl.type === 'pattern') {
        this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Họ không được chứa kí tự đặc biệt !@#$%^&*(),.?":{}|<>' });
      } else if (firstNameControl.type === 'required') {
        this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Bạn phải nhập họ' });
      };
    }
    else if (lastNameControl.error && lastNameControl.error === true) {
      if (lastNameControl.type === 'pattern') {
        this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Tên không được chứa kí tự đặc biệt !@#$%^&*(),.?":{}|<>' });
      } else if (lastNameControl.type === 'required') {
        this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Bạn phải nhập tên' });
      };
    }
    else if (phoneControl.error && phoneControl.error === true) {
      if (phoneControl.type === 'pattern') {
        this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Số điện thoại phải là số' });
      } else if (phoneControl.type === 'required') {
        this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải nhập số điện thoại' });
      };
    }
    else if (emailControl.error && emailControl.error === true) {
      if (emailControl.type === 'pattern') {
        this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Email không đúng định dạng' });
      } else if (emailControl.type === 'required') {
        this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Bạn phải nhập email' });
      }
    }
    else if (addressControl.error && addressControl.error === true) {
      this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải nhập địa chỉ' });
    }
    else if (countryControl.error && countryControl.error === true) {
      this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải nhập chọn quốc gia' });
    }
    else if (cityControl.error && cityControl.error === true) {
      this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải nhập chọn Tỉnh/Thành Phố' });
    }
    else if (districtControl.error && districtControl.error === true) {
      this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải nhập chọn Quận/Huyện ' });
    }
    else if (wardControl.error && wardControl.error === true) {
      this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải nhập chọn Xã/Phường' });
    }
    else {
      this._passData.loading(true);
      const userProfile = _.cloneDeep(this.editUserProfileForm.value);

      userProfile.userId = this.currentUser.userId;
      userProfile.CountryDisplay = _.find(this.countryOptions, { 'value': userProfile.country }).label;
      userProfile.CityDisplay = _.find(this.cityOptions, { 'value': userProfile.city }).label;
      userProfile.DistrictDisplay = _.find(this.districtOptions, { 'value': userProfile.district }).label;
      userProfile.WardDisplay = _.find(this.wardOptions, { 'value': userProfile.ward }).label;
      userProfile.birthday = moment(userProfile.birthday).format() !== 'Invalid date' ? moment(userProfile.birthday).format('YYYY-MM-DD') : '';

      userProfile.OrderStaffId = userProfile.orderStaffId;
      userProfile.CareStaffId = userProfile.careStaffId;
      this.userService.addOrUpdateUserCustomer(userProfile).subscribe(
        resaddOrUpdateUserCustomer => {
          if (resaddOrUpdateUserCustomer && resaddOrUpdateUserCustomer.result && resaddOrUpdateUserCustomer.result.success === true) {
            this.showToast('success', 'Thành công', 'Cập nhật thông tin thành công');
            localStorage.setItem('userData', JSON.stringify(Object.assign(this.currentUser, userProfile)));
          } else {
            this.showMessage('Có lỗi xảy ra. Hãy thử lại.', 'error');
          }
          this._passData.loading(false);
        },
        err => {
          this.showMessage('Có lỗi xảy ra. Hãy thử lại.', 'error');
          this._passData.loading(false);
        })
    }
  }

  showMessage(str: string, type: string) {
    const _self = this;
    _self.msgs = [];
    _self.msgs.push({ severity: type, summary: str, detail: '' });
    setTimeout(function () {
      this.msgs = [];
    }, 4000);
  }

  showToast(type: string, summary: string, detail: string) {
    this.messageService.add({ severity: type, summary: summary, detail: detail, life: 4000 });
    setTimeout(function () {
      this.msgs = [];
    }, 4000);
  }

  refresh() {
    window.location.reload();
  }
}



