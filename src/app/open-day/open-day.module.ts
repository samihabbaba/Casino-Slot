import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { OpenDayRoutingModule } from "./open-day-routing.module";
import { OpenDayComponent } from "./open-day.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [OpenDayComponent],
  imports: [CommonModule, OpenDayRoutingModule, SharedModule],
  providers: [DatePipe],
})
export class OpenDayModule {}
