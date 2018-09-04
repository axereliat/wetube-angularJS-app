import { Component, OnInit } from '@angular/core';
import {TubeModel} from "../models/tube.model";
import {RemoteService} from "../services/remote.service";
import {CategoryModel} from "../models/category.model";
import {Router} from "@angular/router";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [RemoteService]
})
export class CreateComponent implements OnInit {

  model: TubeModel;
  categories: CategoryModel[];
  iframeUrl: any;

  constructor(private remoteService: RemoteService, private router: Router, private spinnerService: Ng4LoadingSpinnerService, private sanitizer: DomSanitizer) {
    this.model = new TubeModel('', '', '', '1', '');
    this.categories = [];
  }

  ngOnInit() {
    this.remoteService.getCategories().then(categoryModel => {
      for (const category of categoryModel) {
        this.categories.push(category);
      }
      this.model.categoryId = this.categories[0].id;
    });
  }

  getIframe(url: string): string {
    if (url !== null) {
      let youtubeId1 = url.split("v=")[1];
      let youtubeId = youtubeId1.split('&')[0];

      return 'https://www.youtube.com/embed/' + youtubeId;
    }
    return '';
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onSubmit(): void {
    this.spinnerService.show();
    this.remoteService.createTube(this.model)
      .then(resp => {
        this.spinnerService.hide();
        this.router.navigateByUrl('/');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
