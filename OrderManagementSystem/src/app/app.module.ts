import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditOrganizationComponent } from './compontents/organization/edit-organization/edit-organization.component';
import { EditCustomerComponent } from './compontents/customer/edit-customer/edit-customer.component';
import { EditOrderComponent } from './compontents/order/edit-order/edit-order.component';
import { EditOrderItemComponent } from './compontents/order-item/edit-order-item/edit-order-item.component';
import { EditProductComponent } from './compontents/product/edit-product/edit-product.component';
import { CustomerListComponent } from './compontents/customer/customer-list/customer-list.component';
import { OrganizationListComponent } from './compontents/organization/organization-list/organization-list.component';
import { OrderListComponent } from './compontents/order/order-list/order-list.component';
import { ProductListComponent } from './compontents/product/product-list/product-list.component';
import { LoginComponent } from './compontents/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './compontents/dashboard/dashboard.component';
import { UserListComponent } from './compontents/user/user-list/user-list.component';
import { EditUserComponent } from './compontents/user/edit-user/edit-user.component';
import { NgToastModule } from 'ng-angular-popup';
import { NavMenuComponent } from './compontents/nav-menu/nav-menu.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EditOrganizationComponent,
    EditCustomerComponent,
    EditOrderComponent,
    EditOrderItemComponent,
    EditProductComponent,
    CustomerListComponent,
    OrganizationListComponent,
    OrderListComponent,
    ProductListComponent,
    LoginComponent,
    DashboardComponent,
    UserListComponent,
    EditUserComponent,
    NavMenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
