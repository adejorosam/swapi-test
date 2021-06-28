import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Request } from "express";
import { GetCharactersDto } from './dto/get-characters.dto';
import { GetMoviesDto } from './dto/get-movies.dto';
import { customResponse, ICustomResponse } from './utils/response';
import { createCommentSchema } from './dto/comment.schema';
import { JoiValidationPipe } from './utils/joi-validation.pipe';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentDto } from './dto/get-comment.dto';


const get_ip = require('ipware')().get_ip;
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("movies")
  @ApiResponse({ status: HttpStatus.OK, type: GetMoviesDto, description: "Movies successfully retrieved!" })
  async getMovies(): Promise<ICustomResponse> {
    const movies =  await this.appService.getMovies();
   return Promise.all(movies).then((movies) => {
      return customResponse(HttpStatus.OK, "Successful", {
        count: movies.length,
        movies: movies.map(movie => new GetMoviesDto(movie))
      })
    })
  }

  @Get("characters")
  @ApiQuery({
    name: "filter",
    description: "filter by gender",
    required: false,
    type: String,
    enum: ['Female', 'Male']
  })

  @ApiQuery({
    name: "sort",
    description: "Sort by height",
    required: false,
    type: Number,
  })

  @ApiQuery({
    name: "order",
    description: "Order resources",
    required: false,
    type: String,
    enum: ['ASCD', 'DESC'],
  })

  @ApiResponse({ status: HttpStatus.OK, type: GetCharactersDto, description: "Characters successfully retrieved!" })
  async getCharacters(@Req() request: Request): Promise<ICustomResponse> {
    const characters =  await this.appService.getCharacters(request.query);
    const count = characters.map(character => {
      if(character.height === 'unknown'){
        return 0;
      }
      return +character.height
    }).reduce((a, b) => a + b, 0);
    return customResponse(HttpStatus.OK, "Successful", {
      totalCount: characters.length,
      totalHeightIncm: count,
      totalHeightInft: count/30.48,
      characters: characters.map(character => new GetCharactersDto(character)),
    })
  }


  @Post("comments")
  @ApiResponse({ status: HttpStatus.CREATED, type: GetCommentDto, description: "Branch successfully created!" })
  async createComment(@Body(new JoiValidationPipe(createCommentSchema)) createCommentDto: CreateCommentDto, @Req() request: Request): Promise<ICustomResponse>{
    const {clientIp} = get_ip(request);
    const newComment: Comment = await this.appService.createComment({...createCommentDto, clientIp});
    return customResponse(HttpStatus.OK, "Successful", new GetCommentDto(newComment));
  }



  // @Get("characters")
  // @ApiResponse({ status: HttpStatus.OK, type: GetCharactersDto, description: "Characters successfully retrieved!" })
  // async getCharacters(): Promise<ICustomResponse> {
  //   const characters =  await this.appService.getCharacters();
  //   // console.log(characters)
  //   return customResponse(HttpStatus.OK, "Successful", {
  //     count: characters.length,
  //     characters: characters.map(character => new GetCharactersDto(character)),
  //   })
  // }
}
