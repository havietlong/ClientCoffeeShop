import { Routes } from '@angular/router';
import { HomeComponent } from './page/components/home/home.component';
import { MenuComponent } from './page/components/menu/menu.component';
import { OrderComponent } from './page/components/order/order.component';
import { ScanQrComponent } from './page/components/scan-qr/scan-qr.component';
import { CartPageComponent } from './page/components/cart-page/cart-page.component';
import { FoodPageComponent } from './page/components/food-page/food-page.component';
import { GtComponent } from './page/components/gt/gt.component';
import { DhComponent } from './page/components/dh/dh.component';
export const routes: Routes = [
    { path: 'home/:tableNum', component: GtComponent },
    { path: 'menu/:tableNum', component: MenuComponent },
    { path: 'order/:tableNum', component: OrderComponent },
    { path: 'scan-qr', component: ScanQrComponent },
    { path: 'cart-page/:tableNum', component: CartPageComponent},
    { path: 'search/:searchTerm', component: MenuComponent },
    { path: 'tag/:tag', component: MenuComponent },
    { path: 'food/:id/:tableNum', component: FoodPageComponent},
    { path: 'dh', component: DhComponent}
];
