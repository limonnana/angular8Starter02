import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    data: { title: 'anms.menu.signup' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule {}
