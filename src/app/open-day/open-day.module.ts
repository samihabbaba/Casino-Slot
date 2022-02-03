import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenDayRoutingModule } from './open-day-routing.module';
import { OpenDayComponent } from './open-day.component';


@NgModule({
  declarations: [
    OpenDayComponent
  ],
  imports: [
    CommonModule,
    OpenDayRoutingModule
  ]
})
export class OpenDayModule { }
