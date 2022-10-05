import { CurrentUser } from '@libs/common/decorators'
import {
  JwtAuthGuard,
  LocalAuthGuard,
  RefreshJwtAuthGuard
} from '@libs/common/guards'
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AdminService } from '../admin/admin.service'
import { Admin } from '../admin/entities/admin.entity'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@Controller()
@ApiTags('授权')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: '登录' })
  async login(@CurrentUser() admin: Admin) {
    // 获取token
    const tokens = await this.authService.getTokens(admin.id, admin.account)
    // 加密当前管理员refresh token并保存
    await this.authService.updateHashRefreshToken(admin.id, tokens.refreshToken)

    return { tokens, admin }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '退出' })
  @ApiBearerAuth()
  async logout(@CurrentUser('id') id: number) {
    return this.adminService.updateRefreshToken(id, null)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshJwtAuthGuard)
  @ApiOperation({ summary: '刷新token' })
  @ApiBearerAuth()
  refreshTokens(@CurrentUser() admin: Admin) {
    return this.authService.refreshTokens(admin.id, admin.account)
  }
}
