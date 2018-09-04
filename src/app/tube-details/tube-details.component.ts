import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RemoteService} from "../services/remote.service";
import {TubeDetailsModel} from "../models/tube-details.model";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../services/auth.service";
import {HasLikedData} from "../data/has-liked.data";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {CommentInputModel} from "../models/comment-input.model";
import {CommentModel} from "../models/comment.model";

@Component({
  selector: 'app-tube-details',
  templateUrl: './tube-details.component.html',
  styleUrls: ['./tube-details.component.css'],
  providers: [RemoteService]
})
export class TubeDetailsComponent implements OnInit {

  model: CommentInputModel;

  private tube: TubeDetailsModel;

  private iframeUrl: any;

  hasLiked: boolean;

  likesCount: string;

  commentsList: CommentModel[];

  constructor(private route: ActivatedRoute, private remoteService: RemoteService, private sanitizer: DomSanitizer, public authService: AuthService, private spinnerService: Ng4LoadingSpinnerService) {
    this.tube = new TubeDetailsModel('', '', '', '', '', '', '', []);
    this.model = new CommentInputModel('');
  }

  ngOnInit() {
    this.spinnerService.show();
    this.remoteService.getSingleTube(this.route.snapshot.params['id'])
      .then(x => {
        this.spinnerService.hide();
        this.tube = x;
        this.iframeUrl = this.getSafeUrl('https://www.youtube.com/embed/' + this.tube.youtubeId);
        this.populateCommentsList();
        this.getLikesCountInfo();

        this.remoteService.hasLikedTube(this.tube.id)
          .then(resp => {
            let hasLikedData = resp as HasLikedData;

            this.hasLiked = hasLikedData.hasLiked === 'true';
          });
      });
  }

  private populateCommentsList() {
    this.commentsList = [];
    this.remoteService.getComments(this.tube.id)
      .then(resp => {
        for (const commentModel of resp) {
          this.commentsList.push(commentModel);
        }
      });
  }

  private getLikesCountInfo() {
    this.remoteService.getLikesCountInfo(this.tube.id)
      .then(resp => {
        this.likesCount = resp.likesCount;
        console.log(resp.likesCount);
      });
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  likeOrUnlike($event) {
    $event.preventDefault();
    this.remoteService.likeOrUnlikeTube(this.tube.id)
      .then(resp => {
        this.remoteService.hasLikedTube(this.tube.id)
          .then(resp => {
            let hasLikedData = resp as HasLikedData;

            this.hasLiked = hasLikedData.hasLiked === 'true';
            this.getLikesCountInfo();
          });
      });
  }

  postComment(): void {
    this.remoteService.postComment(this.model, this.tube.id)
      .then(() => {
        this.populateCommentsList();
      });
  }

  deleteComment(commentId: string): void {
    this.remoteService.deleteComment(commentId)
      .then(() => {
        this.populateCommentsList();
      });
  }
}
