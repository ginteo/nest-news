import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { AdminService } from '../../admin/admin.service'

export class JwtPayload {
  id: number
  account: string
}

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_JWT_SECRET
    } as StrategyOptions)
  }

  async validate(payload: JwtPayload) {
    // 查找当前管理员是否存在
    const admin = await this.adminService.findOne(payload.id)
    if (!admin) {
      throw new UnauthorizedException('未授权，请登录')
    }

    return admin
  }
}
