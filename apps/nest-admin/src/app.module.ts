import { CommonModule } from '@libs/common'
import { JwtAuthGuard } from '@libs/common/guards'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AdminModule } from './admin/admin.module'
import { AuthModule } from './auth/auth.module'
import { RoleModule } from './role/role.module'

@Module({
  imports: [CommonModule, AuthModule, AdminModule, RoleModule],
  providers: [
    // 默认所有接口需jwt验证，不要jwt验证的在方法或类添加NoAuth装饰器
    { provide: APP_GUARD, useClass: JwtAuthGuard }
  ]
})
export class AppModule {}
