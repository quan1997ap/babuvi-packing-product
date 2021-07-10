import { AppInforRatingService } from "./services/app-state/app-infor-rating.service";
import { SystemService } from "./services/system.services";
import { MessagesUtilsService } from "./services/messages-utils.service";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, UrlSerializer } from "@angular/router";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { HttpService } from "./services/common/http.service";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateService } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";

import { DemoMaterialModule } from "./shared/demo.module";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";

import { AppRoutes } from "./app.routing";
import { AppComponent } from "./app.component";

//Component
import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth/auth-layout.component";
import { ShareCommonModule } from "./common/share-common.module";
import { NotificationListComponent } from './layouts/admin/notification-list/notification-list.component';


import { SharedModule } from "./shared/shared.module";
import { LstClientService } from "./services/lstClient.service";
import { CommonService } from "./services/common.service";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { PassDataService } from "./services/pass-data.services";
import { AuthService } from "./services/common/auth.service";
import { AuthGuard } from "./services/common/AuthGuard";
import { LoginService } from "./services/login.service";
import { DataParse } from "./common-func/data-parse";
import { CheckAuthToken } from "./services/common/checkAuthToken.services";
import { AuthChildGuard } from "./services/common/AuthChildGuard";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { CustomUrlSerializer } from "./ship-manager/custom-url-serializer";
import { RequestInterceptor } from "./services/interceptor.service";
import { TooltipModule } from "primeng/tooltip";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, NotificationListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSelectModule,
    MatCardModule,
    DemoMaterialModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    FlexLayoutModule,
    PerfectScrollbarModule,
    NgxDatatableModule,
    ConfirmDialogModule,
    ShareCommonModule,
    TooltipModule,
  ],
  providers: [
    AppInforRatingService,
    SystemService,
    ConfirmationService,
    MessagesUtilsService,
    TranslateService,
    DataParse,
    CommonService,
    AuthService,
    AuthGuard,
    AuthChildGuard,
    CheckAuthToken,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    LstClientService,
    PassDataService,
    LoginService,
    HttpService,
  ],
  entryComponents: [NotificationListComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
