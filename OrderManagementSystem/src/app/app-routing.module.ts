import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './compontents/customer/customer-list/customer-list.component';
import { DashboardComponent } from './compontents/dashboard/dashboard.component';
import { LoginComponent } from './compontents/login/login.component';
import { OrderListComponent } from './compontents/order/order-list/order-list.component';
import { OrganizationListComponent } from './compontents/organization/organization-list/organization-list.component';
import { ProductListComponent } from './compontents/product/product-list/product-list.component';
import { UserListComponent } from './compontents/user/user-list/user-list.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'customers',
        component: CustomerListComponent
    },
    {
        path: 'organization',
        component: OrganizationListComponent
    },
    {
        path: 'orders',
        component: OrderListComponent
    }
    ,
    {
        path: 'products',
        component: ProductListComponent
    }
    ,
    {
        path: 'login',
        component: LoginComponent
    }
    ,
    {
        path: 'users',
        component: UserListComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}