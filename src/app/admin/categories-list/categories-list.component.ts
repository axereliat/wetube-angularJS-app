import { Component, OnInit } from '@angular/core';
import {RemoteService} from "../../services/remote.service";
import {CategoryModel} from "../../models/category.model";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
  providers: [RemoteService]
})
export class CategoriesListComponent implements OnInit {

  categories: CategoryModel[];

  constructor(private remoteService: RemoteService) {
    this.categories = [];
  }

  ngOnInit() {
    this.remoteService.getCategories().then(categoryModel => {
      for (const category of categoryModel) {
        this.categories.push(category);
      }
    });
  }

  deleteCategory(id: string) {
    let confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.remoteService.deleteCategory(id).then(x => {
        this.categories = [];
        this.remoteService.getCategories().then(categoryModel => {
          for (const category of categoryModel) {
            this.categories.push(category);
          }
        });
      });
    }
  }
}
