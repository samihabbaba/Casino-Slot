import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveTableComponent } from './live-table.component';

const routes: Routes = [{ path: "", component: LiveTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveTableRoutingModule { }
