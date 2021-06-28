import { ApiProperty } from "@nestjs/swagger";
import { IsString, Min, Max } from "class-validator";

export class CreateCommentDto {

    @ApiProperty({
      name: "body",
      type: String,
      description: "Comment body",
      required: true,
    })
    @IsString()
    @Min(2)
    @Max(500)
    body: string;

    @ApiProperty({
      name: "movie",
      type: String,
      description: "The Movie a comment belongs to",
      required: false,
    })
    @IsString()
    movie: string;

}