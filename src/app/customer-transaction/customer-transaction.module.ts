import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerTransactionRoutingModule } from './customer-transaction-routing.module';
import { CustomerTransactionComponent } from './customer-transaction.component';
import { LiveCustomerComponent } from './live-customer/live-customer.component';
import { ComplexCustomerComponent } from './complex-customer/complex-customer.component';


@NgModule({
  declarations: [
    CustomerTransactionComponent,
    LiveCustomerComponent,
    ComplexCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerTransactionRoutingModule
  ]
})
export class CustomerTransactionModule { }
