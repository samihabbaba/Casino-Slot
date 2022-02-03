import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChipTransferRoutingModule } from './chip-transfer-routing.module';
import { ChipTransferComponent } from './chip-transfer.component';


@NgModule({
  declarations: [
    ChipTransferComponent
  ],
  imports: [
    CommonModule,
    ChipTransferRoutingModule
  ]
})
export class ChipTransferModule { }
