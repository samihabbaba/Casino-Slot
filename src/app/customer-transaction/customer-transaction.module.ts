import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomerTransactionRoutingModule } from "./customer-transaction-routing.module";
import { CustomerTransactionComponent } from "./customer-transaction.component";
import { LiveCustomerComponent } from "./live-customer/live-customer.component";
import { ComplexCustomerComponent } from "./complex-customer/complex-customer.component";

import { SplitterModule } from "primeng/splitter";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    CustomerTransactionComponent,
    LiveCustomerComponent,
    ComplexCustomerComponent,
  ],
  imports: [
    CommonModule,
    CustomerTransactionRoutingModule,
    SharedModule,
    SplitterModule,
  ],
})
export class CustomerTransactionModule {}
