import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseTransactionRoutingModule } from './case-transaction-routing.module';
import { CaseTransactionComponent } from './case-transaction.component';
import { MoneyExchangeComponent } from './money-exchange/money-exchange.component';
import { DropsComponent } from './drops/drops.component';
import { ChipComponent } from './chip/chip.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CaseTransactionComponent,
    MoneyExchangeComponent,
    DropsComponent,
    ChipComponent
  ],
  imports: [
    CommonModule,
    CaseTransactionRoutingModule,
    SharedModule
  ]
})
export class CaseTransactionModule { }
