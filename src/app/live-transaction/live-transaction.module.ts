import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveTransactionRoutingModule } from './live-transaction-routing.module';
import { LiveTransactionComponent } from './live-transaction.component';


@NgModule({
  declarations: [
    LiveTransactionComponent
  ],
  imports: [
    CommonModule,
    LiveTransactionRoutingModule
  ]
})
export class LiveTransactionModule { }
