import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CaseTransactionComponent } from "./case-transaction.component";

const routes: Routes = [{ path: "", component: CaseTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseTransactionRoutingModule {}
