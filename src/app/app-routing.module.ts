import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitComposComponent } from './Pages/submit-compos/submit-compos.component';
import { AppComponent } from './app.component';
import { HeroPageComponent } from './Pages/hero-page/hero-page.component';
import { DocumentationComponent } from './Pages/documentation/documentation.component';

const routes: Routes = [
  { path: '', component: HeroPageComponent },
  { path: 'submit', component: SubmitComposComponent },
  { path: 'documentation', component: DocumentationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
