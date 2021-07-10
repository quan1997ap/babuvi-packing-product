import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonViewComponent } from './common-view.component';
import { MatIconModule, MatButtonModule, MatPaginatorModule, MatToolbarModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { LstClientService } from 'app/services/lstClient.service';
import { HttpModule } from '@angular/http';
import { HttpService } from 'app/services/common/http.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EditAddressDialogComponent } from './edit-address/edit-address.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AccountHeaderComponent } from './account-header/account-header.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatToolbarModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    LstClientService,
    HttpService
  ],
  declarations: [
    CommonViewComponent,
    ConfirmDialogComponent,
    EditAddressDialogComponent,
    PaginationComponent,
    AccountHeaderComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    EditAddressDialogComponent
  ],
})

export class CommonViewModule {}
