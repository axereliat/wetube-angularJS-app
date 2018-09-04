import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutesModule} from "./routes.module";
import {CommonModule} from "@angular/common";
import { RegisterComponent } from './register/register.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { LoginComponent } from './login/login.component';
import {AuthService} from "./services/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AppRoutesModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class UsersModule { }
