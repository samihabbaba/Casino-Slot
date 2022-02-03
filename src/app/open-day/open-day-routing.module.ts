import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenDayComponent } from './open-day.component';

const routes: Routes = [{ path: '', component: OpenDayComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenDayRoutingModule { }
