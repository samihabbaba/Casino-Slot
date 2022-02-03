import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalityRoutingModule } from './hospitality-routing.module';
import { HospitalityComponent } from './hospitality.component';


@NgModule({
  declarations: [
    HospitalityComponent
  ],
  imports: [
    CommonModule,
    HospitalityRoutingModule
  ]
})
export class HospitalityModule { }
