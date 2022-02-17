import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UIModule } from "./ui/ui.module";

import {
  NgbDropdownModule,
  NgbNavModule,
  NgbPaginationModule,
} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { UiSwitchModule } from "ngx-ui-switch";
import { AutoCompleteModule } from "primeng/autocomplete";
import { WidgetModule } from "./widget/widget.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, UIModule],
  exports: [
    UIModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    WidgetModule,
    NgbDropdownModule,
    UiSwitchModule,
    NgbNavModule,
    AutoCompleteModule,
  ],
})
export class SharedModule {}
