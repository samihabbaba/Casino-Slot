import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerTransactionComponent } from './customer-transaction.component';

const routes: Routes = [{ path: "", component: CustomerTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerTransactionRoutingModule { }
