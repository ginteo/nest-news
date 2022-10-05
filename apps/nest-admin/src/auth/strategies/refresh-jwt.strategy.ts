import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { compareSync } from 'bcryptjs'
import { Request } from 'express'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { AdminService } from '../../admin/admin.service'
import { JwtPayload } from './access-jwt.strategy'

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt'
) {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_JWT_SECRET,
      passReqToCallback: true
    } as StrategyOptions)
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim()

    // 查找当前管理员是否存在
    const admin = await this.adminService.findOne(payload.id)
    if (!admin) {
      throw new UnauthorizedException('未授权，请登录')
    }

    // 比对当前refreshToken与hashRefreshToken是否一致
    if (!compareSync(refreshToken, admin.refreshToken)) {
      new Logger(RefreshJwtStrategy.name).error('refresh token is expired')
      throw new UnauthorizedException('未授权，请登录')
    }

    return admin
  }
}
