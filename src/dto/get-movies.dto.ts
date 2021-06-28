import { ApiProperty } from "@nestjs/swagger";
import { IMovies } from "src/models/movies.interface";

export class GetMoviesDto {

  constructor(data: IMovies){
    this.episodeId = data.episode_id;
    this.title = data.title;
    this.openingCrawl = data.opening_crawl;
    this.commentCount = data.commentCount;
    this.comments = data.comments;
    this.realeaseDate = data.release_date;

  }

    @ApiProperty({
        name: "episodeId",
        type: Number,
        description: "episode's Id",
    })
    episodeId: number;

    @ApiProperty({
        name: "title",
        type: String,
        description: "Movie's title",
      })
    title: string;

    @ApiProperty({
      name: "openingCrawl",
      type: String,
      description: "Movie's opening crawl",
    })
    openingCrawl: string;

    @ApiProperty({
      name: "comments",
      type: [String],
      description: "Movies comments",
    })
    comments: object;

    @ApiProperty({
      name: "commentCount",
      type: Number,
      description: "Movies comment count",
    })
    commentCount: number;

    @ApiProperty({
      name: "realeaseDate",
      type: String,
      description: "Movie date of release",
    })
    realeaseDate: string;
}
