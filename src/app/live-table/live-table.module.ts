import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveTableRoutingModule } from './live-table-routing.module';
import { LiveTableComponent } from './live-table.component';


@NgModule({
  declarations: [
    LiveTableComponent
  ],
  imports: [
    CommonModule,
    LiveTableRoutingModule
  ]
})
export class LiveTableModule { }
