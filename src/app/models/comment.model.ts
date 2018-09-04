import {UserModel} from "./user.model";

export class CommentModel {
  constructor(public id: string,
              public content: string,
              public author: UserModel,
              public addedOn: string) {}
}
