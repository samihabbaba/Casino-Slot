import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomerComponent } from "./customer.component";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UIModule } from "../shared/ui/ui.module";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ],
})
export class CustomerModule {}
