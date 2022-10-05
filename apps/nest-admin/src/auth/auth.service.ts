import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { hashSync } from 'bcryptjs'
import { AdminService } from '../admin/admin.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly adminService: AdminService
  ) {}

  async refreshTokens(userId, account) {
    const tokens = await this.getTokens(userId, account)
    await this.updateHashRefreshToken(userId, tokens.refreshToken)

    return tokens
  }

  async getTokens(id: number, account: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id, account },
        {
          secret: this.configService.get('ACCESS_JWT_SECRET'),
          expiresIn: '15m'
        }
      ),
      this.jwtService.signAsync(
        { id, account },
        {
          secret: this.configService.get('REFRESH_JWT_SECRET'),
          expiresIn: '7d'
        }
      )
    ])

    return { accessToken, refreshToken }
  }

  updateHashRefreshToken(userId: number, refreshToken: string) {
    // refresh token加密
    const hashRefreshToken = hashSync(refreshToken)

    return this.adminService.updateRefreshToken(userId, hashRefreshToken)
  }
}
