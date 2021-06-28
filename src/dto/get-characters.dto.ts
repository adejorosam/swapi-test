import { ApiProperty } from "@nestjs/swagger";
import { ICharacter } from "src/models/characters.interface";

export class GetCharactersDto {

  constructor(data: ICharacter){
    this.name = data.name;
    this.height = data.height;
    this.height = data.height;
    this.mass = data.mass;
    this.hairColor = data.hair_color;
    this.skinColor = data.skin_color;
    this.eyeColor = data.eye_color;
    this.birthYear = data.birth_year;
    this.gender = data.gender;
    this.homeworld = data.homeworld;
    this.films = data.films;
    this.species = data.species;
    this.vehicles = data.vehicles;
    this.starships = data.starships;
    this.url = data.url;
  }

    @ApiProperty({
        name: "name",
        type: String,
        description: "Character's name",
    })
    name: string;

    @ApiProperty({
        name: "height",
        type: String,
        description: "Character's height",
      })
    height: string;

    @ApiProperty({
      name: "mass",
      type: String,
      description: "Character's mass",
    })
    mass: string;

    @ApiProperty({
      name: "hairColor",
      type: String,
      description: "Character's hair color",
    })
    hairColor: string;

    @ApiProperty({
      name: "skinColor",
      type: String,
      description: "Character's skin color",
    })
    skinColor: string;

    @ApiProperty({
        name: "eyeColor",
        type: String,
        description: "Character's eye color",
      })
      eyeColor: string;

      @ApiProperty({
        name: "birthYear",
        type: String,
        description: "Character's birth year",
      })
      birthYear: string;

      @ApiProperty({
        name: "gender",
        type: String,
        description: "Character's gender",
      })
      gender: string;

      @ApiProperty({
        name: "homeworld",
        type: String,
        description: "Character's homeworld",
      })
      homeworld: string;

      @ApiProperty({
        name: "films",
        type: [String],
        description: "Character's films",
      })
      films: object;

      @ApiProperty({
        name: "species",
        type: [String],
        description: "Character's species",
      })
      species: object;

      @ApiProperty({
        name: "vehicles",
        type: [String],
        description: "Character's vehicles",
      })
      vehicles: object;

      @ApiProperty({
        name: "starships",
        type: [String],
        description: "Character's starships",
      })
      starships: object;

      @ApiProperty({
        name: "url",
        type: String,
        description: "Character's url",
      })
      url: string;
}
