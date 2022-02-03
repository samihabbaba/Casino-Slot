import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChipTypeRoutingModule } from './chip-type-routing.module';
import { ChipTypeComponent } from './chip-type.component';


@NgModule({
  declarations: [
    ChipTypeComponent
  ],
  imports: [
    CommonModule,
    ChipTypeRoutingModule
  ]
})
export class ChipTypeModule { }
