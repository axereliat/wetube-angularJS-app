export class TubeDetailsModel {
  constructor(public id: string,
              public title: string,
              public description: string,
              public youtubeId: string,
              public addedOn: string,
              public category: string,
              public publisher: string,
              public tags: string[]) {}
}
