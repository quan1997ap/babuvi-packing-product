import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { LstClientService } from 'app/services/lstClient.service';
import { ClientProfile } from 'app/model/client-profile.model';
import { CommonService } from 'app/services/common.service';
import { MenuFromServer } from 'app/model/menu-from-server.model';
import { Router } from '@angular/router';
import { PassDataService } from 'app/services/pass-data.services';

@Component({
  selector: 'app-admin-tool',
  templateUrl: './list-user-manager.component.html',
  styleUrls: ['./list-user-manager.component.scss']
})
export class listUserManagerComponent implements OnInit {
  
  displayedColumns = ['userCode', 'username', 'firstName', 'lastName', 
  'phone', 'statusDisplay', 'rightDisplay', 'createdDate'];
  dataSource = new MatTableDataSource<ClientProfile>(ELEMENT_DATA);
  _lstButton: MenuFromServer[] = []
  values: any

  ngOnInit(){
    this.values = JSON.parse(localStorage.getItem('userData'))
  }

  constructor(
    private _passData: PassDataService,
    private _commonServices: CommonService,
    private _lstClient: LstClientService,
    private router:Router){
      
  }

  ngAfterViewInit () {
      this.getLstUser(1);
      this.getLstAction(this.values.userCode, 'wallet-lstopup');
  }

  private getLstUser(page: number) {
    this._passData.loading(true);
    this._lstClient.getLstUser(page).subscribe ( res => {
      if(res.result.success) {
        this.dataSource.data = res.result.data;
      } else {

      }
      this._passData.loading(false);
    }, err => {
      this._passData.loading(false);
    })
  }

  getLstAction (usercode: number, path: string) {
    this._passData.loading(true);
    this._commonServices.getLstButton(usercode, path).subscribe(res => {
      if(res.result.success) {
        this._lstButton = res.result.data
      } else {

      }
      this._passData.loading(false);
    }, err => {
      this._passData.loading(false);
    })
  }

}

const ELEMENT_DATA: ClientProfile[] = [
];
