import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineRoutingModule } from './machine-routing.module';
import { MachineComponent } from './machine.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MachineComponent
  ],
  imports: [
    CommonModule,
    MachineRoutingModule,
    SharedModule
  ]
})
export class MachineModule { }
