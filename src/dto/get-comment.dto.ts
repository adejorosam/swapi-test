import { ApiProperty } from "@nestjs/swagger";

export class GetCommentDto {

  constructor(data: any){
    this.id = data.id;
    this.body = data.body;
    this.clientIp = data.clientIp;
    this.movie = data.movie;
  }

    @ApiProperty({
        name: "id",
        type: String,
        description: "Comment's Id",
      })
    id: string;


    @ApiProperty({
        name: "body",
        type: String,
        description: "Comment's body",
      })
    body: string;


    @ApiProperty({
      name: "movie",
      type: String,
      description: "Comment's Movie",
    })
    movie: string;

    @ApiProperty({
      name: "clientIp",
      type: String,
      description: "Commenter's IP address",
    })
    clientIp: string;

}