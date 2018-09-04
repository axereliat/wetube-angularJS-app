import { Component, OnInit } from '@angular/core';
import {RemoteService} from "../services/remote.service";
import {ActivatedRoute} from "@angular/router";
import {TubeListModel} from "../models/tube-list.model";

@Component({
  selector: 'app-tubes-bytag',
  templateUrl: './tubes-bytag.component.html',
  styleUrls: ['./tubes-bytag.component.css'],
  providers: [RemoteService]
})
export class TubesBytagComponent implements OnInit {

  tagName: string;
  tubes: TubeListModel[];

  constructor(private route: ActivatedRoute, private remoteService: RemoteService) {
    this.tubes = [];
  }

  ngOnInit() {
    this.tagName = this.route.snapshot.params['name'];
    this.remoteService.getTubesByTagName(this.tagName)
      .then(model => {
        for (const tube of model) {
          this.tubes.push(tube);
        }
      });
  }
}
