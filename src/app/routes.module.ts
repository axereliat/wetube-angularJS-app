import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {CreateComponent} from "./create/create.component";
import {AuthGuardService} from "./guards/auth.guard";
import {TubeDetailsComponent} from "./tube-details/tube-details.component";
import {TubesBytagComponent} from "./tubes-bytag/tubes-bytag.component";
import {TubeEditComponent} from "./tube-edit/tube-edit.component";
import {TubeDeleteComponent} from "./tube-delete/tube-delete.component";
import {CategoriesListComponent} from "./admin/categories-list/categories-list.component";
import {CategoriesCreateComponent} from "./admin/categories-create/categories-create.component";
import {AdminGuardService} from "./guards/admin.guard";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'tubes/create', component: CreateComponent, canActivate: [AuthGuardService]},
  { path: 'tubes/details/:id', component: TubeDetailsComponent},
  { path: 'tubes/byTag/:name', component: TubesBytagComponent},
  { path: 'tubes/edit/:id', component: TubeEditComponent},
  { path: 'tubes/delete/:id', component: TubeDeleteComponent},
  { path: 'categories', component: CategoriesListComponent, canActivate: [AdminGuardService]},
  { path: 'categories/create', component: CategoriesCreateComponent, canActivate: [AdminGuardService]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutesModule { }
