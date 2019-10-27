import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SharedModule } from '../../shared/shared.module';
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SharedModule, SignupRoutingModule]
})
export class SignupModule {}
