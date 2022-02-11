import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetersRoutingModule } from './meters-routing.module';
import { MetersComponent } from './meters.component';
import { MeterListComponent } from './meter-list/meter-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MetersComponent,
    MeterListComponent
  ],
  imports: [
    CommonModule,
    MetersRoutingModule,
    SharedModule
  ]
})
export class MetersModule { }
