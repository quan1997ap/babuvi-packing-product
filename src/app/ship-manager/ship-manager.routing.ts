import { Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';

export const ShipManagerRoutes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent
  }
];
