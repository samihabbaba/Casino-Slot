import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseTransactionRoutingModule } from './case-transaction-routing.module';
import { CaseTransactionComponent } from './case-transaction.component';


@NgModule({
  declarations: [
    CaseTransactionComponent
  ],
  imports: [
    CommonModule,
    CaseTransactionRoutingModule
  ]
})
export class CaseTransactionModule { }
