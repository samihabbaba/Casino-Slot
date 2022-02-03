import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerTransactionRoutingModule } from './customer-transaction-routing.module';
import { CustomerTransactionComponent } from './customer-transaction.component';


@NgModule({
  declarations: [
    CustomerTransactionComponent
  ],
  imports: [
    CommonModule,
    CustomerTransactionRoutingModule
  ]
})
export class CustomerTransactionModule { }
