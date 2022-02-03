import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChipTransferComponent } from "./chip-transfer.component";

const routes: Routes = [{ path: "", component: ChipTransferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChipTransferRoutingModule {}
