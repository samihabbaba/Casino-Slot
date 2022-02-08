import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChipTypeRoutingModule } from './chip-type-routing.module';
import { ChipTypeComponent } from './chip-type.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ChipTypeComponent
  ],
  imports: [
    CommonModule,
    ChipTypeRoutingModule,
    SharedModule
  ]
})
export class ChipTypeModule { }
