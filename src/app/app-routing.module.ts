import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitComposComponent } from './pages/submit-compos/submit-compos.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';

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