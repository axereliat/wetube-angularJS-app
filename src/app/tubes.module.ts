import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutesModule} from "./routes.module";
import {CommonModule} from "@angular/common";
import {RegisterComponent} from './register/register.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LoginComponent} from './login/login.component';
import {AuthService} from "./services/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CreateComponent} from './create/create.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { TubeDetailsComponent } from './tube-details/tube-details.component';
import { TubesBytagComponent } from './tubes-bytag/tubes-bytag.component';
import { TubeEditComponent } from './tube-edit/tube-edit.component';
import { TubeDeleteComponent } from './tube-delete/tube-delete.component';

@NgModule({
  declarations: [
    CreateComponent,
    TubeDetailsComponent,
    TubesBytagComponent,
    TubeEditComponent,
    TubeDeleteComponent
  ],
  imports: [
    CommonModule,
    AppRoutesModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class TubesModule {
}
