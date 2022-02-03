import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveDataRoutingModule } from './live-data-routing.module';
import { LiveDataComponent } from './live-data.component';


@NgModule({
  declarations: [
    LiveDataComponent
  ],
  imports: [
    CommonModule,
    LiveDataRoutingModule
  ]
})
export class LiveDataModule { }
