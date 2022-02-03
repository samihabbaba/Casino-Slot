import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotTransactionComponent } from './slot-transaction.component';

const routes: Routes = [{ path: '', component: SlotTransactionComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotTransactionRoutingModule { }
