import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Response } from 'express'
import { map, Observable } from 'rxjs'
import { KEEP_KEY } from '../decorators/keep.decorator'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const isKeep = this.reflector.get<boolean>(
          KEEP_KEY,
          context.getHandler()
        )

        // 根据isKeep的值判断是否保持原数据响应，不进行转换
        if (isKeep) {
          return data
        } else {
          const response = context.switchToHttp().getResponse<Response>()
          const status = response.statusCode

          return { code: status, data, message: 'success' }
        }
      })
    )
  }
}
