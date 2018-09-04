import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {AppRoutesModule} from "./routes.module";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AuthService} from "./services/auth.service";
import {LoginComponent} from "./login/login.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UsersModule} from "./users.module";
import {TubesModule} from "./tubes.module";
import {CreateComponent} from "./create/create.component";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "./guards/auth.guard";
import {Ng4LoadingSpinnerModule} from "ng4-loading-spinner";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {AdminGuardService} from "./guards/admin.guard";
import {CategoriesModule} from "./categories.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UsersModule,
    TubesModule,
    CategoriesModule,
    Ng4LoadingSpinnerModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [AuthService, AuthGuardService, AdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
