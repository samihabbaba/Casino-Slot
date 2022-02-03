import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChipTypeComponent } from './chip-type.component';

const routes: Routes = [{ path: "", component: ChipTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChipTypeRoutingModule { }
