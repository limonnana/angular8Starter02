import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { SignupModule } from './login/signup/signup.module';
import { LoginModule } from './login/login/login.module';

declare var require: any;

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    //new entities
    SignupModule,
    LoginModule,

    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
