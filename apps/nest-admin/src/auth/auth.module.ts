import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { AdminModule } from '../admin/admin.module'
import { LocalStrategy } from './strategies/local.strategy'
import { AccessJwtStrategy } from './strategies/access-jwt.strategy'
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy'

@Module({
  imports: [AdminModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AccessJwtStrategy, RefreshJwtStrategy]
})
export class AuthModule {}
