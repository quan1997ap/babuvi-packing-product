import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

// Model
import { User } from '../../model/user.model';
import { lstCountry } from '../../model/country.model';
import { Warehouse } from '../../model/warehouse.model';
import { usersetting } from '../../config/app.config';

// libs
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit {

  editUserCustomerForm: FormGroup;
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

  listLevel = [];
  listLevelOptions = []; // for dropdown

  userStaffs: User[] = [];
  userStaffOptions = [];

  warehouseVNs: Warehouse[] = [];
  warehouseVNOptions = [];

  constructor(
    private _location: Location,
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private _passData: PassDataService,
    private userService: UserService,
    public cdr: ChangeDetectorRef,
    public route: ActivatedRoute,
    public router: Router,
    public systemService: SystemService,
    public rightService: RightService
  ) {
  }

  ngOnInit() {
    this._passData.loading(true);
    this.editUserCustomerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[^!@#$%^&*(),.?":{}|<>]*$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[^!@#$%^&*(),.?":{}|<>]*$')]),
      username: new FormControl('', [Validators.pattern('^[^!@#$%^&*(),?":{}|<>]*$')]),
      // note regex password https://helpex.vn/question/regex-cho-mat-khau-phai-chua-it-nhat-tam-ky-tu-it-nhat-mot-so-va-ca-chu-thuong-va-chu-hoa-va-ky-tu-dac-biet-5cb71aeeae03f62598de3864
      password: new FormControl('', [Validators.required, Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,1000}$`)]),
      rePassword: new FormControl('', [Validators.required, Validators.pattern(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,1000}$`)]),
      phone: new FormControl('', [Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      address: new FormControl('', [Validators.required]),
      birthday: new FormControl(undefined),
      sex: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required]),
      userLevel: new FormControl(null),
      rightId: new FormControl(null, [Validators.required]),
      orderStaffId: new FormControl(null, [Validators.required]),
      careStaffId: new FormControl(null, [Validators.required]),
      warehouseReceive: new FormControl(null, [Validators.required])
    });

    const currentUserId = this.route.snapshot.paramMap.get("userId");
    if (currentUserId) {
      this.userService.getInfoUserById(Number(currentUserId)).subscribe(userInfor => {
        if (userInfor && userInfor.result && userInfor.result.data) {
          this.currentUser = userInfor.result.data;
          this.currentUser.warehouseReceive = Number(this.currentUser.warehouseReceive);
          this.getAllFormData();
        }
      });
    } else {
      this._passData.loading(false);
      this.currentUser = this.editUserCustomerForm.value;
      this.getAllFormData();
    }

    this.editUserCustomerForm.valueChanges.subscribe(val => {
      this.msgs = [];
    });
  }


  getAllFormData() {
    this._passData.loading(true);
    forkJoin(
      this.systemService.getListSex(),
      this.rightService.getListRight(),
      this.systemService.getListLevel(),
      this.userService.getUserStaffs(),
      this.systemService.getWarehouseVN(),
      this.getAddressComboboxs()
    ).subscribe(res => {
      if (res) {
        if (res[0] && res[0].length > 0) {
          this.listSex = res[0];
          this.listSexOptions = res[0].map((status: any) => ({ label: status.displayValue, value: status.value }))
        }
        if (res[1] && res[1].length > 0) {
          this.listRight = res[1];
          this.listRightOptions = res[1].map((item: any) => ({ label: item.displayValue, value: item.rightId }));
        }
        if (res[2] && res[2].length > 0) {
          this.listLevel = res[2];
          this.listLevelOptions = res[2].map((item: any) => ({ label: item.displayValue, value: item.code.toString() }));
          console.log(this.listLevelOptions);
        }
        console.log(res[3]);
        if (res[3] && res[3].length > 0) {
          this.userStaffs = res[3];
          this.userStaffOptions = res[3].map((item: any) => ({ label: item.username, value: item.userId }));
        }
        if (res[4] && res[4].length > 0) {
          this.warehouseVNs = res[4];
          this.warehouseVNOptions = res[4].map(
            (consignmentWarehouse: Warehouse) => ({ label: consignmentWarehouse.name, value: consignmentWarehouse.warehouseId })
          );
        }
        this.currentUser.rePassword = this.currentUser.password;
        this.currentUser.birthday = moment(this.currentUser.birthday).format() !== 'Invalid date' ? new Date(this.currentUser.birthday) : null;
        this.editUserCustomerForm.patchValue(this.currentUser);
      }
      this.loadDataSuccess = true;
      this._passData.loading(false);
    }, error => {
      this.loadDataSuccess = false;
      this._passData.loading(false);
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
        if (this.editUserCustomerForm.value.country) {
          this.systemService.getAreaByParent(this.editUserCustomerForm.value.country).subscribe(
            (resCity: lstCountry[]) => {
              // reset dropdown 
              this.editUserCustomerForm.value.city = null;
              this.editUserCustomerForm.value.district = null;
              this.editUserCustomerForm.value.ward = null;
              this.editUserCustomerForm.patchValue(_.cloneDeep(this.editUserCustomerForm.value));

              // reset form
              this.cityList = [];
              this.cityOptions = [];

              this.districtList = [];
              this.districtOptions = [];

              this.wardList = [];
              this.wardOptions = [];

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
        if (this.editUserCustomerForm.value.city) {
          this.systemService.getAreaByParent(this.editUserCustomerForm.value.city).subscribe(
            (resDistrict: lstCountry[]) => {

              // reset Dropdown
              this.editUserCustomerForm.value.district = null;
              this.editUserCustomerForm.value.ward = null;
              this.editUserCustomerForm.patchValue(_.cloneDeep(this.editUserCustomerForm.value));

              // reset form
              this.districtList = [];
              this.districtOptions = [];

              this.wardList = [];
              this.wardOptions = [];

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
        if (this.editUserCustomerForm.value.district) {
          this.systemService.getAreaByParent(this.editUserCustomerForm.value.district).subscribe(
            (resWard: lstCountry[]) => {
              // reset Dropdown
              this.editUserCustomerForm.value.ward = null;
              this.editUserCustomerForm.patchValue(_.cloneDeep(this.editUserCustomerForm.value));

              // reset form
              this.wardList = [];
              this.wardOptions = [];

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

    this.cdr.detectChanges();
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
      case 'password':
      case 'rePassword':
      case 'username':
      case 'rightId':
      case 'orderStaffId':
      case 'careStaffId':
      case 'warehouseReceive':
        if (form) {
          const formControl = form.get(formControlName);
          const patternControls = ['firstName', 'lastName', 'email', 'username', 'password', 'phone'];
          if (patternControls.includes(formControlName) && formControl.errors && formControl.errors.pattern) {
            return {
              error: true,
              type: 'pattern',
            }
          }
          if (formControl.errors && formControl.errors.minlength && formControl.errors.minlength.requiredLength) {
            return {
              error: true,
              type: 'minlength',
            }
          } else if (formControl.errors && formControl.errors.maxlength && formControl.errors.maxlength.requiredLength) {
            return {
              error: true,
              type: 'maxlength',
            }
          } else if (formControl.errors && formControl.errors.required) {
            return {
              error: true,
              type: 'required',
            }
          } else {
            return { error: false }
          }
        } else {
          return { error: false }
        }
        break;

      default:
        return { error: false }
        break;
    }
  }

  updateUserProfile() {
    this.msgs = [];
    const firstNameControl = this.formValidate('firstName', this.editUserCustomerForm);
    const lastNameControl = this.formValidate('lastName', this.editUserCustomerForm);
    const userNameControl = this.formValidate('username', this.editUserCustomerForm);
    const phoneControl = this.formValidate('phone', this.editUserCustomerForm);
    const emailControl = this.formValidate('email', this.editUserCustomerForm);
    const addressControl = this.formValidate('address', this.editUserCustomerForm);
    const countryControl = this.formValidate('country', this.editUserCustomerForm);
    const cityControl = this.formValidate('city', this.editUserCustomerForm);
    const districtControl = this.formValidate('district', this.editUserCustomerForm);
    const wardControl = this.formValidate('ward', this.editUserCustomerForm);
    const passwordControl = this.formValidate('password', this.editUserCustomerForm);
    const rePasswordControl = this.formValidate('rePassword', this.editUserCustomerForm);
    const rightControl = this.formValidate('rightId', this.editUserCustomerForm);
    const orderStaffIdControl = this.formValidate('orderStaffId', this.editUserCustomerForm);
    const careStaffIdControl = this.formValidate('careStaffId', this.editUserCustomerForm);
    const warehouseReceiveControl = this.formValidate('warehouseReceive', this.editUserCustomerForm);

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
    else if (userNameControl.error && userNameControl.error === true) {
      if (userNameControl.type === 'pattern') {
        this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: 'Tên đăng nhập không được chứa kí tự đặc biệt !@#$%^&*(),.?":{}|<>' });
      }
    }
    else if (
        ['_', '.'].includes(this.editUserCustomerForm.value.username[0]) ||
        ['_', '.'].includes(this.editUserCustomerForm.value.username[this.editUserCustomerForm.value.username.length - 1])
      ) {
        this.msgs.push(
          { severity: 'error', summary: 'Lỗi', detail: 'Dấu gạch dưới và dấu chấm không được ở cuối hoặc đầu tên người dùng' }
        );
      }
      else if (
        this.editUserCustomerForm.value.username.includes('_.')
      ) {
        this.msgs.push(
          { severity: 'error', summary: 'Lỗi', detail: 'Dấu gạch dưới và dấu chấm không được ở cạnh nhau' }
        );
      }
      else if (
        this.editUserCustomerForm.value.username.split('.').length > 2 ||
        this.editUserCustomerForm.value.username.split('_').length > 2
      ) {
        this.msgs.push(
          { severity: 'error', summary: 'Lỗi', detail: 'Không thể sử dụng dấu gạch dưới hoặc dấu chấm nhiều lần trong một hàng' }
        )
      }
      else if (
        this.editUserCustomerForm.value.username.length < 5 ||
        this.editUserCustomerForm.value.username.length > 20
      ) {
        this.msgs.push(
          { severity: 'error', summary: 'Lỗi', detail: 'Tên người dùng phải từ 5 đến 20 ký tự' }
        )
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
    else if (this.editUserCustomerForm.value.password !== this.editUserCustomerForm.value.rePassword) {
      this.msgs.push({ severity: 'error', summary: '', detail: '2 Mật khẩu không giống nhau' });
    }
    else if (passwordControl.error || rePasswordControl.error) {
        if (passwordControl.type === 'pattern' || rePasswordControl.type === 'pattern') {
          this.msgs.push({ severity: 'error', summary: 'Lỗi', detail: `Nhập mật khẩu thỏa mãn các điều kiện bên dưới` });
          this.msgs.push({ severity: 'error', summary: '', detail: `Ít nhất một chữ cái viết hoa` });
          this.msgs.push({ severity: 'error', summary: '', detail: `Ít nhất một chữ thường` });
          this.msgs.push({ severity: 'error', summary: '', detail: `Ít nhất một chữ số` });
          this.msgs.push({ severity: 'error', summary: '', detail: `Có nhiều hơn 4 ký tự` });
          this.msgs.push({ severity: 'error', summary: '', detail: `Ít nhất một biểu tượng đặc biệt` });
        } else if (passwordControl.type === 'required') {
          this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải nhập đủ mật khẩu' });
        }
      }
      else if (
        this.editUserCustomerForm.value.username.includes(' ')
      ) {
        this.msgs.push( { severity: 'error', summary: 'Lỗi', detail: 'Tên đăng nhập Không được chứa dấu cách' });
      }
    else if (addressControl.error && addressControl.error === true) {
      this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải nhập địa chỉ' });
    }
    else if (countryControl.error && countryControl.error === true) {
      this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải chọn quốc gia' });
    }
    else if (cityControl.error && cityControl.error === true) {
      this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải chọn Tỉnh/Thành Phố' });
    }
    else if (districtControl.error && districtControl.error === true) {
      this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải chọn Quận/Huyện ' });
    }
    else if (wardControl.error && wardControl.error === true) {
      this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải chọn Xã/Phường' });
    }
    else if (rightControl.error && rightControl.error === true) {
      this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải chọn quyền' });
    }
    else if (careStaffIdControl.error && careStaffIdControl.error === true) {
      if (careStaffIdControl.type === 'required') {
        this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải chọn nhân viên CSKH' });
      }
    }
    else if (orderStaffIdControl.error && orderStaffIdControl.error === true) {
      if (orderStaffIdControl.type === 'required') {
        this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải chọn nhân viên đặt hàng' });
      }
    }
    else if (warehouseReceiveControl.error && warehouseReceiveControl.error === true) {
      if (warehouseReceiveControl.type === 'required') {
        this.msgs.push({ severity: 'error', summary: '', detail: 'Bạn phải nhập kho nhập hàng' });
      }
    }
    else {
      const userProfile = _.cloneDeep(this.editUserCustomerForm.value);
      if (this.currentUser.userId) {
        userProfile.userId = this.currentUser.userId;
      }
      userProfile.CountryDisplay = _.find(this.countryOptions, { 'value': userProfile.country }).label;
      userProfile.CityDisplay = _.find(this.cityOptions, { 'value': userProfile.city }).label;
      userProfile.DistrictDisplay = _.find(this.districtOptions, { 'value': userProfile.district }).label;
      userProfile.WardDisplay = _.find(this.wardOptions, { 'value': userProfile.ward }).label;
      userProfile.birthday = moment(userProfile.birthday).format() !== 'Invalid date' ? moment(userProfile.birthday).format('YYYY-MM-DD') : '';

      this._passData.loading(true);
      this.userService.addOrUpdateUserCustomer(userProfile).subscribe(
        resaddOrUpdateUserCustomer => {
          if (resaddOrUpdateUserCustomer && resaddOrUpdateUserCustomer.result && resaddOrUpdateUserCustomer.result.success === true) {
            const successMessage = this.currentUser.userId ? 'Cập nhật thông tin thành công' : 'Thêm người dùng thành công';
            this.showToast('success', 'Thành công', successMessage);
            if (this.currentUser.userId) {
              localStorage.setItem('userData', JSON.stringify(Object.assign(this.currentUser, userProfile)));
            } else {
              setTimeout(() => {
                this._location.back();
                this.router.navigateByUrl('/user/userlist');
              }, 300);
            }
          } else if (resaddOrUpdateUserCustomer && resaddOrUpdateUserCustomer.result && resaddOrUpdateUserCustomer.result && resaddOrUpdateUserCustomer.result.message) {
            this.showMessage(resaddOrUpdateUserCustomer.result.message, 'error');
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
  }

  refresh() {
    window.location.reload();
  }
}



