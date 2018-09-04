import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {RegisterModel} from "../models/register.model";
import {RegisterData} from "../data/register.data";
import {LoginModel} from "../models/login.model";
import {AuthService} from "./auth.service";
import {TubeModel} from "../models/tube.model";
import {HttpClient} from "@angular/common/http";
import {TubeListModel} from "../models/tube-list.model";
import {CategoryModel} from "../models/category.model";
import {TubeDetailsModel} from "../models/tube-details.model";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {HasLikedData} from "../data/has-liked.data";
import {CommentModel} from "../models/comment.model";
import {UserModel} from "../models/user.model";
import {CommentInputModel} from "../models/comment-input.model";
import {LikesCountData} from "../data/likes-count.data";

//const baseUrl = 'http://localhost:8000/';
const baseUrl = 'http://wetubebackend.herokuapp.com/';

@Injectable()
export class RemoteService {
  constructor(private http: HttpClient, private authService: AuthService, private spinnerService: Ng4LoadingSpinnerService){}

  register (model: RegisterModel) : Promise<RegisterData> {
    this.spinnerService.show();
    return this.http
      .post(baseUrl + 'register',
        { 'email': model.email, 'username': model.username, 'password': model.password, 'confirmPassword': model.confirmPassword })
      .toPromise()
      .then(resp => {
        this.spinnerService.hide();
        return resp as RegisterData;
      })
      .catch(err => {
        console.log(err);
        return new RegisterData('');
      });
  }

  login (model: LoginModel) : Promise<any> {
    return this.http
      .post(baseUrl + 'login',
        { 'username': model.username, 'password': model.password })
      .toPromise();
  }

  createTube (model: TubeModel) : Promise<any>{
    return this.http
      .post(baseUrl + 'tubes/create',
        { 'title': model.title, 'description': model.description, 'categoryId': model.categoryId, 'tagStr': model.tagStr, 'link': model.link })
      .toPromise();
  }

  getMostRecentTubes (categoryId: string, search: string) : Promise<TubeListModel[]> {
    return this.http
      .get(baseUrl + 'tubes/mostRecent?categoryId=' + categoryId + '&&search=' + search)
      .toPromise()
      .then(resp => {
        return resp as TubeListModel[];
      })
      .catch(err => {
        console.log(err);
        return [];
      });
  }

  getCategories () : Promise<CategoryModel[]> {
    return this.http
      .get(baseUrl + 'categories/list')
      .toPromise()
      .then(resp => resp as CategoryModel[])
      .catch(err => {
        console.log(err);
        return [];
      });
  }

  getSingleTube (id: number) : Promise<TubeDetailsModel> {
    return this.http
      .get(baseUrl + 'tubes/details/' + id)
      .toPromise()
      .then(resp => resp as TubeDetailsModel)
      .catch(err => {
        console.log(err);
        return new TubeDetailsModel('', '', '', '', '', '', '', []);
      });
  }

  getSingleTubeForEditAndDelete (id: string) : Promise<TubeModel> {
    return this.http
      .get(baseUrl + 'tubes/viewModel/' + id)
      .toPromise()
      .then(resp => resp as TubeModel)
      .catch(err => {
        console.log(err);
        return new TubeModel('', '', '', '', '');
      });
  }

  getTubesByTagName (tagName: string) : Promise<TubeListModel[]> {
    this.spinnerService.show();
    return this.http
      .get(baseUrl + 'tubes/byTag?tagName=' + tagName)
      .toPromise()
      .then(resp => {
        this.spinnerService.hide();
        return resp as TubeListModel[];
      })
      .catch(err => {
        console.log(err);
        return [];
      });
  }

  editTube (model: TubeModel, id: string) : Promise<any> {
    return this.http
      .post(baseUrl + 'tubes/edit/' + id,
        { 'title': model.title, 'description': model.description, 'link': model.link,
          'categoryId': model.categoryId, 'tagStr': model.tagStr})
      .toPromise();
  }

  delete (id: string) : Promise<any> {
    return this.http
      .post(baseUrl + 'tubes/delete/' + id,
        {})
      .toPromise();
  }

  createCategory (model: CategoryModel) : Promise<any>{
    return this.http
      .post(baseUrl + 'categories/create',
        { 'name': model.name})
      .toPromise();
  }

  deleteCategory (id: string) : Promise<any>{
    return this.http
      .post(baseUrl + 'categories/delete/' + id,
        {})
      .toPromise();
  }

  hasLikedTube (id: string) : Promise<any> {
    return this.http
      .get(baseUrl + 'tubes/hasLikedTube/' + id)
      .toPromise();
  }

  likeOrUnlikeTube (id: string) : Promise<any> {
    return this.http
      .get(baseUrl + 'tubes/likeOrUnlike/' + id)
      .toPromise();
  }

  getComments (id: string): Promise<CommentModel[]> {
    return this.http
      .get(baseUrl + 'tubes/listComments/' + id)
      .toPromise()
      .then(resp => resp as CommentModel[])
      .catch(err => {
        console.log(err);
        return [];
      });
  }

  postComment (model: CommentInputModel, tubeId: string): Promise<any> {
    this.spinnerService.show();
    return this.http
      .post(baseUrl + 'tubes/postComment/' + tubeId,
        { 'content': model.content })
      .toPromise()
      .then(() => {
        this.spinnerService.hide();
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteComment (id: string): Promise<any> {
    this.spinnerService.show();
    return this.http
      .get(baseUrl + 'tubes/deleteComment/' + id)
      .toPromise()
      .then(() => {
        this.spinnerService.hide();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getLikesCountInfo (id: string): Promise<LikesCountData> {
    this.spinnerService.show();
    return this.http
      .get(baseUrl + 'tubes/likesCount/' + id)
      .toPromise()
      .then(resp => {
        this.spinnerService.hide();
        return resp as LikesCountData;
      })
      .catch(err => {
        console.log(err);
        return new LikesCountData('');
      });
  }
}
