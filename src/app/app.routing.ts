import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth/auth-layout.component";
import { AuthGuard } from "./services/common/AuthGuard";
import { AuthChildGuard } from "./services/common/AuthChildGuard";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "authentication",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "ship-manager",
        canActivate: [AuthGuard],
        loadChildren: "./ship-manager/ship-manager.module#ShipManagerModule",
      },
      {
        path: "admin-tool",
        canActivate: [AuthGuard],
        loadChildren: "./dashboard/admin-manager.module#AdminManagerModule",
      },
      {
        path: "tables",
        canActivate: [AuthGuard],
        loadChildren: "./support/tables.module#TablesModule",
      },
      {
        path: "space",
        canActivate: [AuthGuard],
        loadChildren: "./space/chartlib.module#ChartlibModule",
      },
      {
        path: "pages",
        canActivate: [AuthGuard],
        loadChildren: "./custom-pages/pages.module#PagesDemoModule",
      },
      {
        path: "user",
        canActivate: [AuthGuard],
        loadChildren: "./user/users.module#UsersModule",
      },
      {
        path: "ecommerce",
        canActivate: [AuthGuard],
        loadChildren: "./ecommerce/ecommerce.module#EcommerceDemoModule",
      },
      {
        path: "collaboration",
        loadChildren: "./collaboration/collaboration.module#CollaborationModule",
      },
      // {
      //   path: 'delivery',
      //   canActivate: [AuthGuard],
      //   loadChildren: './delivery/delivery.module#DeliveryModule'
      // },
      {
          path: 'merchandise',
          canActivate: [AuthGuard],
          loadChildren: './merchandise/merchandise.module#MerchandiseModule'
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "authentication",
        // canActivate: [AuthChildGuard],
        loadChildren: "./session/session.module#SessionModule",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "session/404",
  },
];
