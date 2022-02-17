import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomerTransactionRoutingModule } from "./customer-transaction-routing.module";
import { CustomerTransactionComponent } from "./customer-transaction.component";
import { LiveCustomerComponent } from "./live-customer/live-customer.component";
import { ComplexCustomerComponent } from "./complex-customer/complex-customer.component";
import { AngularSplitModule } from "angular-split";
import { SharedModule } from "../shared/shared.module";
import { TableModule } from "primeng/table";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { ContextMenuModule } from "primeng/contextmenu";
import {InputNumberModule} from 'primeng/inputnumber';
import {AutoCompleteModule} from 'primeng/autocomplete';

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
    AngularSplitModule,
    TableModule,
    ContextMenuModule,
    NgbTooltipModule,
    InputNumberModule,
    AutoCompleteModule
  ],
})
export class CustomerTransactionModule {}
