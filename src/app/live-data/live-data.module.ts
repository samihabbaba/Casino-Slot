import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveDataRoutingModule } from './live-data-routing.module';
import { LiveDataComponent } from './live-data.component';
import { CloseDayComponent } from './close-day/close-day.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LiveDataComponent,
    CloseDayComponent
  ],
  imports: [
    CommonModule,
    LiveDataRoutingModule,
    SharedModule
  ]
})
export class LiveDataModule { }
