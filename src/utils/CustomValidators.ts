import * as mongoose from 'mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
@ValidatorConstraint({ name: 'refId', async: false })
export class IsRefId implements ValidatorConstraintInterface {
  validate(id: any, args: ValidationArguments) {
    const {
      Types: { ObjectId },
    } = mongoose;
    if (ObjectId.isValid(id) && new ObjectId(id) == id) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return '"$value" not valid object id!';
  }
}
