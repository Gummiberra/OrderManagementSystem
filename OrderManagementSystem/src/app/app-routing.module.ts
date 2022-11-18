import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './compontents/customer/customer-list/customer-list.component';
import { DashboardComponent } from './compontents/dashboard/dashboard.component';
import { LoginComponent } from './compontents/login/login.component';
import { OrderListComponent } from './compontents/order/order-list/order-list.component';
import { OrganizationListComponent } from './compontents/organization/organization-list/organization-list.component';
import { ProductListComponent } from './compontents/product/product-list/product-list.component';
import { UserListComponent } from './compontents/user/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'customers',
        component: CustomerListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'organization',
        component: OrganizationListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'orders',
        component: OrderListComponent,
        canActivate: [AuthGuard]
    }
    ,
    {
        path: 'products',
        component: ProductListComponent,
        canActivate: [AuthGuard]
    }
    ,
    {
        path: 'login',
        component: LoginComponent
    }
    ,
    {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}