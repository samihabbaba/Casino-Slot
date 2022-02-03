import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveDataComponent } from './live-data.component';

const routes: Routes = [{ path: "", component: LiveDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveDataRoutingModule { }
