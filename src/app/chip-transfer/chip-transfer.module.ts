import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChipTransferRoutingModule } from './chip-transfer-routing.module';
import { ChipTransferComponent } from './chip-transfer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ChipTransferComponent
  ],
  imports: [
    CommonModule,
    ChipTransferRoutingModule,
    SharedModule
  ]
})
export class ChipTransferModule { }
