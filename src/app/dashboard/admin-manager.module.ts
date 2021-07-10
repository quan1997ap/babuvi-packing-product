import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminManagerRoutes } from './admin-manager.routing';
import { MatIconModule, MatButtonModule, MatPaginatorModule } from '@angular/material';
import { LstClientService } from 'app/services/lstClient.service';
import { HttpModule } from '@angular/http';
import { HttpService } from 'app/services/common/http.service';
import { listUserManagerComponent } from './list-user/list-user-manager.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminManagerRoutes),
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [
    LstClientService,
    HttpService
  ],
  declarations: [ listUserManagerComponent ]
})

export class AdminManagerModule {}
