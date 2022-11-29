import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './compontents/customer/customer-list/customer-list.component';
import { EditCustomerComponent } from './compontents/customer/edit-customer/edit-customer.component';
import { DashboardComponent } from './compontents/dashboard/dashboard.component';
import { LoginComponent } from './compontents/login/login.component';
import { OrderListComponent } from './compontents/order/order-list/order-list.component';
import { EditOrganizationComponent } from './compontents/organization/edit-organization/edit-organization.component';
import { OrganizationListComponent } from './compontents/organization/organization-list/organization-list.component';
import { EditProductComponent } from './compontents/product/edit-product/edit-product.component';
import { ProductListComponent } from './compontents/product/product-list/product-list.component';
import { EditUserComponent } from './compontents/user/edit-user/edit-user.component';
import { UserListComponent } from './compontents/user/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';
import { SignInGuard } from './guards/sign-in.guard';

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
        path: 'organizations',
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
        path: 'product',
        component: EditProductComponent,
        canActivate: [AuthGuard]
    }
    ,
    {
        path: 'product/:id',
        component: EditProductComponent,
        canActivate: [AuthGuard]
    }
    ,
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [SignInGuard]
    },
    {
        path: 'users',
        component: UserListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user/:id',
        component: EditUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user',
        component: EditUserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'customer/:id',
        component: EditCustomerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'customer',
        component: EditCustomerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'organization/:id',
        component: EditOrganizationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'organization',
        component: EditOrganizationComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}