import { Component, OnInit } from '@angular/core';
import {LoginModel} from "../models/login.model";
import {RemoteService} from "../services/remote.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {LoginData} from "../data/login.data";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [RemoteService, AuthService]
})
export class LoginComponent implements OnInit {

  model: LoginModel;

  errMsg: string;

  constructor(private remoteService: RemoteService, private authService: AuthService, private router: Router) {
    this.model = new LoginModel('', '');
    this.errMsg = '';
  }

  ngOnInit() {

  }

  onSubmit(): void {
    this.errMsg = '';
    this.remoteService.login(this.model)
      .then(resp => {
        let loginData = resp as LoginData;
        //alert(loginData.token);
        this.authService.saveSession(loginData);
        this.router.navigateByUrl('/');
      })
      .catch(err => {
        console.log(err);
        this.errMsg = 'Bad credentials';
      });
  }
}
