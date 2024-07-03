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
    { path: '', component: GtComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'order', component: OrderComponent },
    { path: 'scan-qr', component: ScanQrComponent },
    { path: 'cart-page', component: CartPageComponent},
    { path: 'search/:searchTerm', component: MenuComponent },
    { path: 'tag/:tag', component: MenuComponent },
    { path: 'food/:id', component: FoodPageComponent},
    { path: 'dh', component: DhComponent}
];
