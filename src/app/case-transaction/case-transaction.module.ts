import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseTransactionRoutingModule } from './case-transaction-routing.module';
import { CaseTransactionComponent } from './case-transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MoneyExchangeComponent } from './money-exchange/money-exchange.component';
import { DropsComponent } from './drops/drops.component';
import { ChipComponent } from './chip/chip.component';


@NgModule({
  declarations: [
    CaseTransactionComponent,
    TransactionsComponent,
    MoneyExchangeComponent,
    DropsComponent,
    ChipComponent
  ],
  imports: [
    CommonModule,
    CaseTransactionRoutingModule
  ]
})
export class CaseTransactionModule { }
