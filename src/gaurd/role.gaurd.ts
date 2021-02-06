import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Error } from 'src/utils/Error';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private requiredRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    if (!this.requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (this.requiredRoles.some((role) => user.roles.includes(role))) {
      return this.requiredRoles.some((role) => user.roles.includes(role));
    } else {
      throw new Error(
        false,
        'not authorized role',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}
