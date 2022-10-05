import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>()

    if (data) {
      return request.user[data]
    }

    return request.user
  }
)
