import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveTransactionRoutingModule } from './live-transaction-routing.module';
import { LiveTransactionComponent } from './live-transaction.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LiveTransactionComponent
  ],
  imports: [
    CommonModule,
    LiveTransactionRoutingModule,
    SharedModule
  ]
})
export class LiveTransactionModule { }
