import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './UI/banner/banner.component';
import { DataInputComponent } from './UI/data-input/data-input.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { WhyUsComponent } from './UI/why-us/why-us.component';
import { SolidFormComponent } from './UI/solid-form/solid-form.component';
import { SubmitComposComponent } from './pages/submit-compos/submit-compos.component';
import { InputFieldsComponent } from './UI/input-fields/input-fields.component';
import { ElementDressingPipe } from './pipes/element-dressing/element-dressing.pipe';
import { CreditsComponent } from './UI/credits/credits.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { CollapsibleComponent } from './UI/collapsible/collapsible.component';
import {DataVisualiserComponent} from "./UI/data-visualiser/data-visualiser.component";

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    DataInputComponent,
    HeroPageComponent,
    WhyUsComponent,
    SolidFormComponent,
    SubmitComposComponent,
    InputFieldsComponent,
    ElementDressingPipe,
    CreditsComponent,
    DocumentationComponent,
    CollapsibleComponent,
  ],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, CommonModule, DataVisualiserComponent],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
