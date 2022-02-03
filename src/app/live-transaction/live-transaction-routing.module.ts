import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveTransactionComponent } from './live-transaction.component';

const routes: Routes = [{ path: "", component: LiveTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveTransactionRoutingModule { }
