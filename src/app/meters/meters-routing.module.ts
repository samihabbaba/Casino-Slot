import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MeterListComponent } from "./meter-list/meter-list.component";
import { MetersComponent } from "./meters.component";

const routes: Routes = [
  { path: "", component: MetersComponent },
  // { path: "list", component: MeterListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetersRoutingModule {}
