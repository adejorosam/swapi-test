import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      let errorMessage: string = error.details[0].message;
      errorMessage = errorMessage.replace(/"/g, `'`);
      throw new HttpException({
        message: errorMessage,
        description: errorMessage,
        statusCode: HttpStatus.BAD_REQUEST
      }, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}

