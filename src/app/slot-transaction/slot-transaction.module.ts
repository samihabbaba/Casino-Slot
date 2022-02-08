import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotTransactionRoutingModule } from './slot-transaction-routing.module';
import { SlotTransactionComponent } from './slot-transaction.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SlotTransactionComponent
  ],
  imports: [
    CommonModule,
    SlotTransactionRoutingModule,
    SharedModule
  ]
})
export class SlotTransactionModule { }
