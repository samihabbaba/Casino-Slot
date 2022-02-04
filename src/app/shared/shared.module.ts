import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UIModule } from "./ui/ui.module";

import { WidgetModule } from "./widget/widget.module";
import { NgbDropdownModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [],
  imports: [CommonModule, UIModule, WidgetModule],
  exports: [
    UIModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
  ],
})
export class SharedModule {}
