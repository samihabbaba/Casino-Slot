import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CaseTransactionComponent } from "../case-transaction/case-transaction.component";
import { TransactionsComponent } from "../case-transaction/transactions/transactions.component";
import { AuthGuard } from "../core/guards/auth.guard";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "dashboard" },

      {
        path: "dashboard",
        loadChildren: () =>
          import("../dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },

      {
        path: "case",
        loadChildren: () =>
          import("../case-transaction/case-transaction.module").then(
            (m) => m.CaseTransactionModule
          ),
      },



      {
        path: "chip-transfer",
        loadChildren: () =>
          import("../chip-transfer/chip-transfer.module").then(
            (m) => m.ChipTransferModule
          ),
      },

      {
        path: "chip-type",
        loadChildren: () =>
          import("../chip-type/chip-type.module").then((m) => m.ChipTypeModule),
      },

      {
        path: "currency",
        loadChildren: () =>
          import("../currency/currency.module").then((m) => m.CurrencyModule),
      },

      {
        path: "customer",
        loadChildren: () =>
          import("../customer/customer.module").then((m) => m.CustomerModule),
      },

      {
        path: "customer-transaction",
        loadChildren: () =>
          import("../customer-transaction/customer-transaction.module").then(
            (m) => m.CustomerTransactionModule
          ),
      },

      {
        path: "hospitality",
        loadChildren: () =>
          import("../hospitality/hospitality.module").then(
            (m) => m.HospitalityModule
          ),
      },

      {
        path: "live-data",
        loadChildren: () =>
          import("../live-data/live-data.module").then((m) => m.LiveDataModule),
      },

      {
        path: "live-table",
        loadChildren: () =>
          import("../live-table/live-table.module").then(
            (m) => m.LiveTableModule
          ),
      },

      {
        path: "live-transaction",
        loadChildren: () =>
          import("../live-transaction/live-transaction.module").then(
            (m) => m.LiveTransactionModule
          ),
      },

      {
        path: "logs",
        loadChildren: () =>
          import("../logs/logs.module").then((m) => m.LogsModule),
      },

      {
        path: "machine",
        loadChildren: () =>
          import("../machine/machine.module").then((m) => m.MachineModule),
      },

      {
        path: "meters",
        loadChildren: () =>
          import("../meters/meters.module").then((m) => m.MetersModule),
      },

      {
        path: "open-day",
        loadChildren: () =>
          import("../open-day/open-day.module").then((m) => m.OpenDayModule),
      },

      {
        path: "slot-transaction",
        loadChildren: () =>
          import("../slot-transaction/slot-transaction.module").then(
            (m) => m.SlotTransactionModule
          ),
      },

      {
        path: "staff",
        loadChildren: () =>
          import("../staff/staff.module").then((m) => m.StaffModule),
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutsRoutingModule {}
