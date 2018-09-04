import { Component, OnInit } from '@angular/core';
import {CategoryModel} from "../../models/category.model";
import {RemoteService} from "../../services/remote.service";
import {Router} from "@angular/router";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";

@Component({
  selector: 'app-categories-create',
  templateUrl: './categories-create.component.html',
  styleUrls: ['./categories-create.component.css'],
  providers: [RemoteService]
})
export class CategoriesCreateComponent implements OnInit {

  model: CategoryModel;

  constructor(private router: Router, private remoteService: RemoteService, private spinnerService: Ng4LoadingSpinnerService) {
    this.model = new CategoryModel('', '');
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.spinnerService.show();
    this.remoteService.createCategory(this.model)
      .then(x => {
        this.spinnerService.hide();
        this.router.navigateByUrl('/categories');
      });
  }

}
