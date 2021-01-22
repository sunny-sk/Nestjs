import { PipeTransform } from '@nestjs/common';
import { Error } from 'src/utils/Error';

export class CParseIntPipe implements PipeTransform {
  transform(value: any) {
    if (parseInt(value).toString() === 'NaN') {
      throw new Error(false, `id "${value}" must be number`, 400);
    }
    return parseInt(value);
  }
}
