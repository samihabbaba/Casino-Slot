import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CaseTransactionComponent } from "./case-transaction.component";
import { ChipComponent } from "./chip/chip.component";
import { DropsComponent } from "./drops/drops.component";
import { MoneyExchangeComponent } from "./money-exchange/money-exchange.component";
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "transactions" },
  {
    path: "transactions",
    component: CaseTransactionComponent,
  },
  { path: "money-exchange", component: MoneyExchangeComponent },
  { path: "drops", component: DropsComponent },
  { path: "chip", component: ChipComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseTransactionRoutingModule {}
