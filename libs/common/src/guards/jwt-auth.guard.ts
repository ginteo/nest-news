import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'
import { NO_AUTH_KEY } from '../decorators/no-auth.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isNoAuth = this.reflector.getAllAndOverride(NO_AUTH_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    // 不需要jwt验证
    if (isNoAuth) {
      return true
    }

    return super.canActivate(context)
  }
}
