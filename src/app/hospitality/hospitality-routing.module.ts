import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalityComponent } from './hospitality.component';

const routes: Routes = [{ path: "", component: HospitalityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalityRoutingModule { }
