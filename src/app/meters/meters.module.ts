import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetersRoutingModule } from './meters-routing.module';
import { MetersComponent } from './meters.component';


@NgModule({
  declarations: [
    MetersComponent
  ],
  imports: [
    CommonModule,
    MetersRoutingModule
  ]
})
export class MetersModule { }
