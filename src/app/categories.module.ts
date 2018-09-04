import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutesModule} from "./routes.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { CategoriesListComponent } from './admin/categories-list/categories-list.component';
import { CategoriesCreateComponent } from './admin/categories-create/categories-create.component';

@NgModule({
  declarations: [
    CategoriesListComponent,
    CategoriesCreateComponent
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
export class CategoriesModule {
}
