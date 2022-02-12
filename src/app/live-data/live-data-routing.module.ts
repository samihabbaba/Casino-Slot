import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CloseDayComponent } from "./close-day/close-day.component";
import { LiveDataComponent } from "./live-data.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "sessions" },
  { path: "sessions", component: LiveDataComponent },
  { path: "close-day", component: CloseDayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveDataRoutingModule {}
