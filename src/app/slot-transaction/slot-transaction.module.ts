import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotTransactionRoutingModule } from './slot-transaction-routing.module';
import { SlotTransactionComponent } from './slot-transaction.component';


@NgModule({
  declarations: [
    SlotTransactionComponent
  ],
  imports: [
    CommonModule,
    SlotTransactionRoutingModule
  ]
})
export class SlotTransactionModule { }
