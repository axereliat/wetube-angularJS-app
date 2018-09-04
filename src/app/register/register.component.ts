import { Component, OnInit } from '@angular/core';
import {RegisterModel} from "../models/register.model";
import {RemoteService} from "../services/remote.service";
import {Router} from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RemoteService]
})
export class RegisterComponent implements OnInit {

  errMsg: string;

  model: RegisterModel;

  constructor(private remoteService: RemoteService, private router: Router) {
    this.model = new RegisterModel('', '', '', '');
    this.errMsg = '';
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.remoteService.register(this.model).then(x => {
      if (x.error === 'none') {
        this.router.navigateByUrl('/login');
        return;
      }

      this.errMsg = x.error;
    });
  }
}
