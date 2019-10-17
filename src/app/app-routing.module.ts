import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsComponent } from './forms/reactive-forms/reactive-forms.component';
import { TemplateDrivenFormsComponent } from './forms/template-driven-forms/template-driven-forms.component';
import { ObservableComponent } from './observable/observable.component';
import { DIComponent } from './di/di.component';


const routes: Routes = [
  { path: '', redirectTo: '/r-forms', pathMatch: 'full' },
  { path: 'r-forms', component: ReactiveFormsComponent },
  { path: 'td-forms', component: TemplateDrivenFormsComponent },
  { path: 'observable', component: ObservableComponent },
  { path: 'di', component: DIComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
