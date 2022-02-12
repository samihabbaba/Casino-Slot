import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComplexCustomerComponent } from "./complex-customer/complex-customer.component";
import { CustomerTransactionComponent } from "./customer-transaction.component";
import { LiveCustomerComponent } from "./live-customer/live-customer.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "slot" },
  { path: "slot", component: CustomerTransactionComponent },
  { path: "live", component: LiveCustomerComponent },
  { path: "complex", component: ComplexCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerTransactionRoutingModule {}
