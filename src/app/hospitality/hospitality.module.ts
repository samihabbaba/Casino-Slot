import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalityRoutingModule } from './hospitality-routing.module';
import { HospitalityComponent } from './hospitality.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HospitalityComponent
  ],
  imports: [
    CommonModule,
    HospitalityRoutingModule,
    SharedModule
  ]
})
export class HospitalityModule { }
