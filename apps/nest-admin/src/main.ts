import { HttpExceptionFilter } from '@libs/common/filters/http-exception.filter'
import { TransformInterceptor } from '@libs/common/interceptors/transform.interceptor'
import {
  Logger,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const logger = new Logger('main.ts')
  const APP_HOST = configService.get('APP_HOST', 'http://localhost')
  const APP_PORT = configService.get('APP_ADMIN_PORT', 3000)
  const APP_PREFIX = configService.get('APP_ADMIN_PREFIX', '')

  // 设置全局前缀
  app.setGlobalPrefix(APP_PREFIX)

  // 配置swagger
  const config = new DocumentBuilder()
    .setTitle('新闻后台管理系统api文档')
    .setLicense('MIT', 'https://github.com/ginteo/nest-news/blob/main/LICENSE')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(`${APP_PREFIX}/api-docs`, app, document)

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      // 验证器将去掉没有使用任何验证装饰器的属性
      whitelist: true,
      // 据对象的 DTO 类自动将有效负载转换为对象类型
      transform: true,
      transformOptions: {
        // 自动解析 DTO 中定义的类型，启用内置类型之间的自动转换
        enableImplicitConversion: true
      },
      // 默认BadRequestException，修改为UnprocessableEntityException
      exceptionFactory(errors: ValidationError[]) {
        return new UnprocessableEntityException(
          Object.values(errors[0].constraints)[0]
        )
      }
    })
  )

  // 全局拦截器，返回统一数据格式
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()))

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(APP_PORT, () =>
    logger.log(
      `服务器启动成功，接口文档请访问：${APP_HOST}:${APP_PORT}${APP_PREFIX}/api-docs`
    )
  )
}
bootstrap()
