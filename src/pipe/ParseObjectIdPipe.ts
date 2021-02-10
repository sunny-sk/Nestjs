import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Error } from 'src/utils/Error';
@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any, _: ArgumentMetadata) {
    const {
      Types: { ObjectId },
    } = mongoose;
    if (ObjectId.isValid(value) && new ObjectId(value) == value) {
      return value.toString();
    }
    throw new Error(false, 'not valid object id', HttpStatus.BAD_REQUEST);
  }
}
