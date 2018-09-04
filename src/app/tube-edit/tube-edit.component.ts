import { Component, OnInit } from '@angular/core';
import {RemoteService} from "../services/remote.service";
import {TubeModel} from "../models/tube.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryModel} from "../models/category.model";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-tube-edit',
  templateUrl: './tube-edit.component.html',
  styleUrls: ['./tube-edit.component.css'],
  providers: [RemoteService]
})
export class TubeEditComponent implements OnInit {

  model: TubeModel;
  categories: CategoryModel[];
  tubeId: string;
  iframe: any;

  constructor(private route: ActivatedRoute, private router: Router, private remoteService: RemoteService, private spinnerService: Ng4LoadingSpinnerService, private sanitizer: DomSanitizer) {
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

  getIframe(url: string): string {
    let youtubeId1 = url.split("v=")[1];
    let youtubeId = youtubeId1.split('&')[0];
    return 'https://www.youtube.com/embed/' + youtubeId;
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onSubmit(): void {
    this.spinnerService.show();
    this.remoteService.editTube(this.model, this.tubeId)
      .then(resp => {
        this.spinnerService.hide();
        this.router.navigateByUrl('/tubes/details/' + this.tubeId);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
