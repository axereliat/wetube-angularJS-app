import { Component, OnInit } from '@angular/core';
import {RemoteService} from "../services/remote.service";
import {TubeModel} from "../models/tube.model";
import {CategoryModel} from "../models/category.model";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tube-delete',
  templateUrl: './tube-delete.component.html',
  styleUrls: ['./tube-delete.component.css'],
  providers: [RemoteService]
})
export class TubeDeleteComponent implements OnInit {

  model: TubeModel;
  categories: CategoryModel[];
  tubeId: string;

  constructor(private route: ActivatedRoute, private router: Router, private remoteService: RemoteService, private spinnerService: Ng4LoadingSpinnerService) {
    this.model = new TubeModel('', '', '', '', '');
    this.categories = [];
    this.tubeId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.remoteService.getSingleTubeForEditAndDelete(this.tubeId)
      .then(x => this.model = x);

    this.remoteService.getCategories().then(categoryModel => {
      for (const category of categoryModel) {
        this.categories.push(category);
      }
      //this.model.categoryId = this.categories[0].id;
    });
  }

  onSubmit(): void {
    this.spinnerService.show();
    this.remoteService.delete(this.tubeId)
      .then(resp => {
        this.spinnerService.hide();
        this.router.navigateByUrl('/');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
