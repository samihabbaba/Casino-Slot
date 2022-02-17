import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";

import {
  NgbNavModule,
  NgbAccordionModule,
  NgbTooltipModule,
  NgbModule,
  NgbAlertModule,
} from "@ng-bootstrap/ng-bootstrap";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";

import { LayoutsModule } from "./layouts/layouts.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UIModule } from "./shared/ui/ui.module";
import { LoginComponent } from "./login/login.component";
import { ToastrModule } from "ngx-toastr";

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    FormsModule,
    LayoutsModule,
    AppRoutingModule,
    UIModule,
    NgbNavModule,
    ScrollToModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
