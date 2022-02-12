import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetersRoutingModule } from './meters-routing.module';
import { MetersComponent } from './meters.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MetersComponent,
  ],
  imports: [
    CommonModule,
    MetersRoutingModule,
    SharedModule
  ]
})
export class MetersModule { }
