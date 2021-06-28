import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { ICharacter } from './models/characters.interface';
import { IMovies } from './models/movies.interface';
import  Comment  from './entities/comments.entitie';
@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  BASE_URL: string = "https://swapi.dev/api/";


  async getMovies(): Promise<IMovies[]> {
    try {
      const requestUrl = `${this.BASE_URL}films/`
      const response = await axios.get(requestUrl);
      let sortedResponse =  response.data.results.sort(function(a, b) {
        return new Date(b.release_date).valueOf() - new Date(a.release_date).valueOf();
      });

      sortedResponse = await sortedResponse.map(async (movie) => {
        let current = await this.commentRepository.find({movie: movie.episode_id});
        movie['comments'] = [...current];
        movie['commentsCount'] = [...current].length;
        return movie;
      })
      return sortedResponse;
    } catch (error) {
      console.error(error);
    }
  }


  async getCharacters(query: any): Promise<ICharacter[]> {
    try {
      const requestUrl = `${this.BASE_URL}people/`;
      let results = [];
      const response = await axios.get(requestUrl);
      let nextPage = 2;
      
      results = [...results, ...response.data.results];
      while(nextPage <= Math.ceil(response.data.count/response.data.results.length)){
        const newResponse = await axios.get(`${this.BASE_URL}people/?page=${nextPage}`);
        results = [...results, ...newResponse.data.results];
        nextPage++;
      }

      if(query.sort){
        results =  results.filter(result => result.height === query.sort)
      }

      if(query.order === "ASCD"){
        results = results.sort(function(a, b){
          return a.height - b.height
        })
      }

      if(query.order === "DESC"){
        results = results.sort(function(a, b){
          return b.height - a.height
        })
      }

      if(query.filter){
        results = results.filter(result => result.gender === query.filter.toLowerCase())
      }

      return results;
    } catch (error) {
      console.error(error);
    }
  }


  async createComment(body){
    try {
      return this.commentRepository.save(body);
    } catch (error) {
      console.log('Error: ', error);
    }
  }



  // async getCharacters(): Promise<ICharacter[]> {
  //   try {
  //     const requestUrl = `${this.BASE_URL}people/`;
  //     let results = [];
  //     const response = await axios.get(requestUrl);
  //     let nextPage = 2;
      
  //     results = [...results, ...response.data.results];
  //     while(nextPage <= Math.ceil(response.data.count/response.data.results.length)){
  //       const newResponse = await axios.get(`${this.BASE_URL}people/?page=${nextPage}`);
  //       results = [...results, ...newResponse.data.results];
  //       console.log(results.length, newResponse.data.results.length)
  //       nextPage++;
  //     }
  //     return results;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
