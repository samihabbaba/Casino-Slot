import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./core/guards/auth.guard";
import { LayoutComponent } from "./layouts/layout.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  // tslint:disable-next-line: max-line-length

  { path: "login", component: LoginComponent },

  {
    path: "",
    loadChildren: () =>
      import("./layouts/layouts.module").then((m) => m.LayoutsModule),
    canActivate: [AuthGuard],
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
