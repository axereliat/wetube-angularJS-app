import {Component, OnInit} from "@angular/core";
import {RemoteService} from "../services/remote.service";
import {TubeListModel} from "../models/tube-list.model";
import {CategoryModel} from "../models/category.model";
import {TubeModel} from "../models/tube.model";
import {SearchModel} from "../models/search.model";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RemoteService]
})
export class HomeComponent implements OnInit {

  tubes: TubeListModel[];
  categories: CategoryModel[];
  model: SearchModel;

  constructor(private remoteService: RemoteService, public authService: AuthService) {
    this.tubes = [];
    this.model = new SearchModel('', '0');
    this.categories = [];
  }

  ngOnInit() {
    // populating the categories array
    this.remoteService.getCategories().then(categoryModel => {
      for (const category of categoryModel) {
        this.categories.push(category);
      }
    });

    // populating the tubes array
    this.remoteService.getMostRecentTubes(this.model.categoryId, this.model.search)
      .then(model => {
        for (const tube of model) {
          this.tubes.push(tube);
        }
      });
  }

  generateTubes(): void {
    this.remoteService.getMostRecentTubes(this.model.categoryId, this.model.search)
      .then(model => {
        this.tubes = [];
        for (const tube of model) {
          this.tubes.push(tube);
        }
      });
  }
}
