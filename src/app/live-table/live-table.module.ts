import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveTableRoutingModule } from './live-table-routing.module';
import { LiveTableComponent } from './live-table.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LiveTableComponent
  ],
  imports: [
    CommonModule,
    LiveTableRoutingModule,
    SharedModule
  ]
})
export class LiveTableModule { }
