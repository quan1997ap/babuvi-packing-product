import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { LstClientService } from 'app/services/lstClient.service';
import { ClientProfile } from 'app/model/client-profile.model';

@Component({
  selector: 'app-common-view',
  templateUrl: './common-view.component.html',
  styleUrls: ['./common-view.component.scss']
})
export class CommonViewComponent implements OnInit {
  
  displayedColumns = ['userCode', 'username', 'firstName', 'lastName', 
  'phone', 'statusDisplay', 'rightDisplay', 'createdDate'];
  dataSource = new MatTableDataSource<ClientProfile>(ELEMENT_DATA);

  ngOnInit(){

  }

  constructor(){

  }

}

const ELEMENT_DATA: ClientProfile[] = [
];
